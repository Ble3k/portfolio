<?php

require ('phpmailer/PHPMailerAutoload.php');
require_once ('phpmailer/class.phpmailer.php');
include ('phpmailer/class.smtp.php');

$mail = new PHPMailer();

$name = trim(strip_tags($_POST['name']));
$comment = trim(strip_tags($_POST['comment']));
$email = $_POST['email'];
$referer = $_SERVER['HTTP_REFERER'];

$mail->isSMTP();

$mail->Host = *****;
// //$mail->SMTPDebug  = 2;
$mail->SMTPAuth = true;
$mail->Username = *****;  // Свой логин для почты
$mail->Password = *****; // Пароль от почтового ящика
$mail->SMTPSecure = *****;
$mail->Port = *****;

$mail->CharSet = 'UTF-8';
$mail->From = *****;
$mail->FromName = 'Protfolio web-site';
$mail->addAddress('*****');
$mail->isHTML(true);

$body = "<p>Пользователь - <b>$name</b>, оставил контакты:<br>
               1) почта - <b>$email</b><br>
               Комментарий: <b>$comment<b><br>";

$mail->Subject = "PORTFOLIO-WEB";
$mail->Body = $body;

if ($mail->send()) {
  echo success;
} else {
  echo error;
};

?>