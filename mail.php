<?php
if(isset($_POST['full_name'])) {
	$to .= 'info@gi-hub.com';

	// subject
	$subject = $_POST['message_subject'];

	// message
	$message = '<p><strong>Hi <span style="color:#9b3027;">GI-Hub</span>, this Message is from your website contact us section</strong><br /><br />
				<b>Name</b>: ' . $_POST['full_name'] . '<br /><br />
				<b>Email Address</b>: ' . $_POST['email_address'] . '<br /><br />
				<b>Mobile Number</b>: ' . $_POST['mobile_number'] . '<br /><br />
				<b>Subject :</b> ' . $_POST['message_subject'] . '<br /><br />
				<b>Message</b>: ' . $_POST['message'] . '</p> <br />';

	// To send HTML mail, the Content-type header must be set
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

	// Additional headers
	$headers .= 'From: ' . $_POST['full_name'] . ' <noreply@gi-hub.com>' . "\r\n";
	$headers .= 'Reply-To: ' .$_POST['email_address'] . "\r\n";

	// Mail it
	mail($to, $subject, $message, $headers);
}
?>