from django.db import models
from django.contrib.auth.models import User

class Trip(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    budget = models.IntegerField()
    start_date = models.DateField()
    end_date = models.DateField()
    start_location = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    people_count = models.IntegerField()

class TripInvite(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    email = models.EmailField()
    token = models.CharField(max_length=100)
    accepted = models.BooleanField(default=False)


class TravelRequest(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_requests")
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_requests")
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=20,
        choices=[
            ("pending", "Pending"),
            ("accepted", "Accepted"),
            ("rejected", "Rejected")
        ],
        default="pending"
    )

from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    otp = models.CharField(max_length=6, null=True, blank=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.email

