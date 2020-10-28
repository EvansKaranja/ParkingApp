
from django.contrib.gis.db import models
# Create your mod


class MpesaPayments(models.Model):

    MerchantRequestID = models.CharField(max_length=50)
    CheckoutRequestID = models.CharField(max_length=50)
    Amount = models.FloatField()
    MpesaReceiptNumber = models.CharField(max_length=50)
    TransactionDate = models.DateTimeField()
    PhoneNumber = models.CharField(max_length=16)

    class Meta:
        verbose_name_plural = 'Lipa na Mpesa Payments'

    def __str__(self):
        return f"{self.MpesaReceiptNumber} received {self.Amount} receipt number {self.PhoneNumber} on {self.TransactionDate}"
