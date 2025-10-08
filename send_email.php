<?php
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialschars($_POST['email']);
    $message = htmlspecial chars($_POST['message']);

    $to = "atomack315@gmail.com";
    $subject = "New Contact Submission from " . $name;
    $headers = "From: " . $email . "\r\n .
               "Reply-To: " . $email . "\r\n" .
               "Content-Type: text/plain; charset=UTF-8";

    if (mail($to, $subject, $message, $headers)) {
      echo "Email sent successfully!";
    } else {
      echo "Failed to send email";
    }
}
?>
