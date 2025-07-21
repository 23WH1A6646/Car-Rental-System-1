package com.bvrith.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.bvrith.model.Booking;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    private final String senderEmail = "naveenagurram02@gmail.com";

   
 

    // ✅ New HTML Email support
    public void sendHtmlEmail(String to, String subject, String htmlBody) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(senderEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true); // true = HTML
            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
    
    

    /**
     * Sends booking status notification based on current booking status.
     */
    public void sendBookingStatusEmail(Booking booking) {
        String userEmail = booking.getUser().getEmail();
        String userName = booking.getUser().getFullName();
        String status = booking.getBookingStatus().name();
        String subject = "Booking Status Update: " + status;
        String htmlBody;

        String buttonHtml = "<p style='margin-top:20px;'>" +
                "<a href='http://localhost:8081/bookings' " +
                "style='display:inline-block;padding:10px 20px;background-color:#4169E1;color:white;text-decoration:none;border-radius:5px;font-weight:bold;'>" +
                "View My Bookings</a></p>";

        switch (status) {
            case "PENDING":
                htmlBody = "<html><body style='font-family: Arial, sans-serif;'>" +
                        "<h2 style='color:#4169E1;'>Booking Status: Pending</h2>" +
                        "<p>Hi <strong>" + userName + "</strong>,</p>" +
                        "<p>Your booking is currently <strong>pending</strong>. We’ll notify you once it’s confirmed.</p>" +
                        buttonHtml +
                        "<p>Thanks!</p></body></html>";
                break;

            case "CONFIRMED":
                htmlBody = "<html><body style='font-family: Arial, sans-serif;'>" +
                        "<h2 style='color:green;'>Booking Confirmed!</h2>" +
                        "<p>Hi <strong>" + userName + "</strong>,</p>" +
                        "<p>Your booking has been confirmed for the car:</p>" +
                        "<p><strong>" + booking.getCar().getBrand() + " " + booking.getCar().getModel() + "</strong></p>" +
                        "<p>From <strong>" + booking.getStartDate() + "</strong> to <strong>" + booking.getEndDate() + "</strong>.</p>" +
                        buttonHtml +
                        "<p>Thank you for choosing us!</p></body></html>";
                break;

            case "CANCELLED":
                htmlBody = "<html><body style='font-family: Arial, sans-serif;'>" +
                        "<h2 style='color:red;'>Booking Cancelled</h2>" +
                        "<p>Hi <strong>" + userName + "</strong>,</p>" +
                        "<p>Your booking has been <strong>cancelled</strong>.</p>" +
                        "<p>If this was a mistake, feel free to book again anytime.</p>" +
                        buttonHtml +
                        "<p>Thanks!</p></body></html>";
                break;

            default:
                htmlBody = "<html><body style='font-family: Arial, sans-serif;'>" +
                        "<h2 style='color:#4169E1;'>Booking Status Update</h2>" +
                        "<p>Hi <strong>" + userName + "</strong>,</p>" +
                        "<p>Your booking status has been updated to: <strong>" + status + "</strong>.</p>" +
                        buttonHtml +
                        "</body></html>";
        }

        sendHtmlEmail(userEmail, subject, htmlBody);
    }

}
