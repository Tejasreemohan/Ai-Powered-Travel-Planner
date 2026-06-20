from django import views
from django.urls import path
from .views import (
    accept_invite,
    get_places,
    reject_invite,
    test_api,
    signup,
    verify_otp,
    login,
    create_trip,
    get_trips,
    get_single_trip,
    update_trip,
    delete_trip,
    ai_suggestions,
    update_profile,
    profile_stats,
    invited_collaborators,
    send_invite,
)

urlpatterns = [
    path("test/", test_api),
    path("signup/", signup),
    path("verify-otp/", verify_otp),
    path("login/", login),

    path("trips/create/", create_trip),
    path("trips/", get_trips),
    path("trips/<int:trip_id>/", get_single_trip),
    path("trips/<int:trip_id>/update/", update_trip),
    path("trips/<int:trip_id>/delete/", delete_trip),
    path("trips/<int:trip_id>/ai/", ai_suggestions),
    path("trips/<int:trip_id>/invite/", send_invite),

    path("profile/update/", update_profile),
    path("profile/stats/", profile_stats),
    path("profile/invites/", invited_collaborators),
    path("trips/<int:trip_id>/accept/", accept_invite),
    path("trips/<int:trip_id>/reject/", reject_invite),
    path("trips/<int:trip_id>/places/", get_places),
]
