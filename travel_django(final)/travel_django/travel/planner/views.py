
import json
import random
from datetime import datetime

from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed

from .models import Trip, TripInvite


# ---------------- TEST ----------------

@api_view(["GET"])
def test_api(request):
    return Response({"message": "Backend working successfully"})


# ---------------- TRIP ----------------

@api_view(["POST"])
def create_trip(request):

    try:
        jwt_auth = JWTAuthentication()
        auth = jwt_auth.authenticate(request)

        if auth is None:
            raise AuthenticationFailed("Unauthenticated")

        user, token = auth
        data = request.data

        trip = Trip.objects.create(
            user=user,
            budget=int(data["budget"]),
            start_date=datetime.strptime(data["startDate"], "%Y-%m-%d").date(),
            end_date=datetime.strptime(data["endDate"], "%Y-%m-%d").date(),
            start_location=data["startLocation"],
            destination=data["destination"],
            people_count=int(data["peopleCount"]),
        )

        return Response({
            "message": "Trip created successfully",
            "tripId": trip.id
        }, status=201)

    except Exception as e:
        return Response({"error": str(e)}, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_trips(request):

    trips = Trip.objects.filter(user=request.user).order_by("-id")

    data = []
    for trip in trips:
        data.append({
            "id": trip.id,
            "destination": trip.destination,
            "budget": trip.budget,
            "start_date": trip.start_date,
            "end_date": trip.end_date,
            "people_count": trip.people_count
        })

    return Response(data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_single_trip(request, trip_id):

    try:
        trip = Trip.objects.get(id=trip_id, user=request.user)

        return Response({
            "id": trip.id,
            "destination": trip.destination,
            "budget": trip.budget,
            "start_date": trip.start_date,
            "end_date": trip.end_date,
            "people_count": trip.people_count
        })

    except Trip.DoesNotExist:
        return Response({"error": "Trip not found"}, status=404)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_trip(request, trip_id):

    try:
        trip = Trip.objects.get(id=trip_id, user=request.user)
        data = request.data

        trip.budget = data.get("budget", trip.budget)
        trip.start_date = data.get("start_date", trip.start_date)
        trip.end_date = data.get("end_date", trip.end_date)
        trip.destination = data.get("destination", trip.destination)
        trip.people_count = data.get("people_count", trip.people_count)

        trip.save()

        return Response({"message": "Trip updated successfully"})

    except Trip.DoesNotExist:
        return Response({"error": "Trip not found"}, status=404)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_trip(request, trip_id):

    try:
        trip = Trip.objects.get(id=trip_id, user=request.user)
        trip.delete()

        return Response({"message": "Trip deleted successfully"})

    except Trip.DoesNotExist:
        return Response({"error": "Trip not found"}, status=404)


# # ---------------- AI SUGGESTIONS ----------------

# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def ai_suggestions(request, trip_id):

#     try:
#         current_trip = Trip.objects.get(id=trip_id, user=request.user)

#         user_budget = current_trip.budget
#         min_budget = int(user_budget * 0.8)
#         max_budget = int(user_budget * 1.2)

#         matching_trips = Trip.objects.filter(
#             destination__iexact=current_trip.destination,
#             budget__gte=min_budget,
#             budget__lte=max_budget
#         ).exclude(user=request.user)

#         people = []

#         for trip in matching_trips:
#             people.append({
#                 "name": trip.user.username,
#                 "destination": trip.destination,
#                 "budget": trip.budget,
#                 "people_count": trip.people_count
#             })

#         return Response({
#             "destination": current_trip.destination,
#             "your_budget": user_budget,
#             "budget_range": f"{min_budget}-{max_budget}",
#             "matches_found": len(people),
#             "people": people
#         })

#     except Trip.DoesNotExist:
#         return Response({"error": "Trip not found"}, status=404)

from datetime import timedelta

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def ai_suggestions(request, trip_id):

    try:
        current_trip = Trip.objects.get(id=trip_id, user=request.user)

        user_budget = current_trip.budget

        min_budget = int(user_budget * 0.8)
        max_budget = int(user_budget * 1.2)

        current_start = current_trip.start_date
        current_end = current_trip.end_date

        matching_trips = Trip.objects.filter(
            destination__iexact=current_trip.destination,
            budget__gte=min_budget,
            budget__lte=max_budget,
            start_date__lte=current_end + timedelta(days=7),
            end_date__gte=current_start - timedelta(days=7)
        ).exclude(user=request.user)

        people = []

        for trip in matching_trips:

            people.append({
                "name": trip.user.username,
                "email": trip.user.email,

                "destination": trip.destination,

                "start_date": trip.start_date,
                "end_date": trip.end_date,

                "budget": trip.budget,
                "people_count": trip.people_count
            })

        return Response({
            "destination": current_trip.destination,
            "your_budget": user_budget,
            "budget_range": f"{min_budget}-{max_budget}",
            "matches_found": len(people),
            "people": people
        })

    except Trip.DoesNotExist:
        return Response(
            {"error": "Trip not found"},
            status=404
        )

# ---------------- PROFILE ----------------

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_profile(request):

    user = request.user
    name = request.data.get("name")

    if not name:
        return Response({"error": "Name required"}, status=400)

    user.first_name = name
    user.save()

    return Response({
        "name": user.first_name,
        "email": user.email
    })


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile_stats(request):

    trips_count = Trip.objects.filter(user=request.user).count()

    return Response({
        "trips_created": trips_count
    })



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def send_invite(request, trip_id):

    email = request.data.get("email")

    if not email:
        return Response({"error": "Email is required"}, status=400)

    try:
        trip = Trip.objects.get(id=trip_id, user=request.user)

        # prevent duplicate
        if TripInvite.objects.filter(trip=trip, email=email).exists():
            return Response({"error": "User already invited"}, status=400)

        # create invite
        TripInvite.objects.create(
            trip=trip,
            email=email,
            accepted=False
        )

        invite_link = f"http://localhost:3000/trip/{trip_id}/accept-invite?email={email}"

        # 🔥 SAFE EMAIL SENDING
        try:
            send_mail(
                subject="You're Invited to Join a Trip ✈️",
                message=f"""
You have been invited.

Click here:
{invite_link}
""",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[email],
                fail_silently=False,
            )
        except Exception as e:
            print("EMAIL ERROR:", str(e))  # 🔥 no crash

        return Response({
            "message": "Invite sent successfully",
            "invite_link": invite_link
        })

    except Trip.DoesNotExist:
        return Response({"error": "Trip not found"}, status=404)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def invited_collaborators(request):

    invites = TripInvite.objects.filter(trip__user=request.user)

    data = []

    for invite in invites:
        data.append({
            "email": invite.email,
            "accepted": invite.accepted,
            "trip_id": invite.trip.id
        })

    return Response(data)



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def accept_invite(request, trip_id):

    email = request.data.get("email")

    try:
        invite = TripInvite.objects.get(
            trip_id=trip_id,
            email=email   # 🔥 USE PASSED EMAIL
        )

        invite.accepted = True
        invite.save()

        return Response({"message": "Invite accepted successfully"})

    except TripInvite.DoesNotExist:
        return Response({"error": "Invite not found"}, status=404)
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def reject_invite(request, trip_id):

    email = request.data.get("email")

    try:
        invite = TripInvite.objects.get(
            trip_id=trip_id,
            email=email
        )

        invite.accepted = False
        invite.save()

        return Response({"message": "Invite rejected"})

    except TripInvite.DoesNotExist:
        return Response({"error": "Invite not found"}, status=404)
    


# ---------------- AUTH ----------------

def generate_otp():
    return str(random.randint(100000, 999999))


@csrf_exempt
def signup(request):

    if request.method != "POST":
        return JsonResponse({"success": False}, status=405)

    data = json.loads(request.body)

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return JsonResponse({"success": False, "message": "All fields required"})

    if User.objects.filter(username=email).exists():
        return JsonResponse({"success": False, "message": "User already exists"})

    otp = generate_otp()

    user = User.objects.create_user(
        username=email,
        email=email,
        password=password,
        first_name=name,
        is_active=False
    )

    user.last_name = otp
    user.save()

    send_mail(
        "OTP Verification",
        f"Your OTP is {otp}",
        settings.EMAIL_HOST_USER,
        [email],
        fail_silently=False,
    )

    return JsonResponse({"success": True})


@csrf_exempt
def verify_otp(request):

    if request.method != "POST":
        return JsonResponse({"success": False}, status=405)

    data = json.loads(request.body)

    email = data.get("email")
    otp = data.get("otp")

    try:
        user = User.objects.get(username=email)

    except User.DoesNotExist:
        return JsonResponse({"success": False, "message": "User not found"})

    if user.last_name != otp:
        return JsonResponse({"success": False, "message": "Wrong OTP"})

    user.is_active = True
    user.last_name = ""
    user.save()

    return JsonResponse({"success": True})


@csrf_exempt
def login(request):

    if request.method != "POST":
        return JsonResponse({"success": False}, status=405)

    data = json.loads(request.body)

    email = data.get("email")
    password = data.get("password")

    user = authenticate(username=email, password=password)

    if user is None:
        return JsonResponse({"success": False, "message": "Invalid credentials"})

    if not user.is_active:
        return JsonResponse({"success": False, "message": "OTP not verified"})

    refresh = RefreshToken.for_user(user)

    return JsonResponse({
        "success": True,
        "access": str(refresh.access_token),
        "refresh": str(refresh)
    })


from groq import Groq
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_places(request, trip_id):
    try:
        trip = Trip.objects.get(id=trip_id, user=request.user)
        destination = trip.destination

        client = Groq(api_key=settings.GROQ_API_KEY)

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",  # ✅ FINAL WORKING MODEL
            messages=[
                {
                    "role": "user",
                    "content": f"List top 10 famous tourist places in {destination}. Only names separated by commas."
                }
            ]
        )

        text = response.choices[0].message.content

        print("GROQ RESPONSE:", text)

        places = [p.strip() for p in text.split(",")]

        return Response({"places": places})

    except Exception as e:
        print("ERROR:", str(e))
        return Response({"error": str(e)}, status=400)


