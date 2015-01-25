<?php
if($_SERVER['REQUEST_METHOD'] === 'POST') {

	$to = 'admin@reazul.net';
	$subject = 'Email From Your Website';

	$message = array();
	$message[] = $_POST['message'];
	$message[] = 'Phone: '.trim($_POST['phone']);

	$name = trim($_POST['name']);
	$from = trim($_POST['email']);

	$headers   = array();
	$headers[] = "MIME-Version: 1.0";
	$headers[] = "Content-type: text/plain; charset=utf-8";
	$headers[] = "From: ".$name." <".$from.">";
	$headers[] = "Reply-To: ".$name." <".$from.">";
	$headers[] = "X-Mailer: PHP/".phpversion();

	$sent = mail($to, $subject, implode("\r\n", $message), implode("\r\n", $headers));

	if($sent) {
		echo "success";
	} else {
		echo "error";
	}
} else {
	echo "<!-- no content -->";
}
?>