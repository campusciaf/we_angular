<?php

function set_template($nombre)
{

    return <<<MESSAGE
    <div style='background-color: #f2f2f2'>
        <div style='width:90%; padding:2%; margin:auto'>
            <table width='90%' border='0' cellpadding='0' cellspacing='0' align='center'>
                
            </table>		
            <br>
            <div style='background-color: #fff'>
                <table width='100%' border='0' >
                    <tr>
                        <td>
                        <center><br>	
                            <div style='width:80%; vertical-align:middle; padding:5px 0 5px 5px;'>
                                <img height='auto' style="width:100%;" src='https://www.ciaf.edu.co/landing/public/img/Respuesta_formulario_CIAF.jpg'>
                            </div>	
                        </td>
                    </tr>
                </table>
                <table width='81%'  border='0' align='center'>
                <tr height='0'>
                    <td align='right' style='padding: 0'>
                        <br><br>
                        <a href='https://wa.me/573143400100' target='_blank' rel="noopener noreferrer"><img src='https://www.ciaf.edu.co/landing/public/img/whatsapp.png'></a>
                        <a href='https://es-la.facebook.com/ComunidadCIAF/' target='_blank'><img src='https://www.ciaf.edu.co/landing/public/img/facebook.png'></a>
                        <a href='https://www.instagram.com/comunidadciaf/' target='_blank'><img height="32px" width="32px" src='https://www.ciaf.edu.co/landing/public/img/instagram.png'></a>
                        <a href='https://www.youtube.com/channel/UCgaRVYt3yzzlhbLZ1vhxCUQ' target='_blank'><img src='https://www.ciaf.edu.co/landing/public/img/youtube.png'></a>
                        <br><br>
                    </td>
                </tr>
                </table>
                <table class="texto" width='100%' cellpadding='20' cellspacing='0' align='center' border='0' bgcolor='#fff'>
                <tr>
                    <td align='left'>
    
                    <font size='4px' face='Arial, Helvetica, sans-serif'><b class="nombre_bienvenida">Hola $nombre<b></font>
                    </td>
                </tr>
                <tr>
                    <td align='left'>
                    <font size='3px' face='Arial, Helvetica, sans-serif'>Hemos recibido tus datos y a la brevedad nos estaremos     contactando contigo o si lo prefieres, escríbenos a través de WhatsApp <B>3143400100</B>.</font>
                    </td>
                </tr>
                <tr>
                    <td style='text-align: left;'>
                    <font size='3px' color='#212020' face='Arial, Helvetica, sans-serif'>Estás a un paso de tomar la decisión más importante de tu vida <B>¡Matricúlate ya!</B></font><br>
                    </td>
                </tr>
                <tr >
                    <td style='text-align: left;'>
                    <font size='3px' color='#212020' face='Arial, Helvetica, sans-serif'>... Y haz parte de nuestra comunidad<b>CIAF</b></font><br>
                    </td>
                </tr>
                <tr>
                    <td style='text-align: left;'>
                    <font size='3px' color='#212020' face='Arial, Helvetica, sans-serif'>Saludos cordiales,</font><br>
                    </td>
                </tr>
                <tr>
                    <td style='text-align: left;'>
                    <font size='3px' color='#212020' face='Arial, Helvetica, sans-serif'>John Jairo Segura Madrigal <br>
                        Director de Mercadeo</font><br>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div width='100%' >
                                <div style='float: left; text-align: right; width: 30%;'>
                                    <img width='80px' src='https://www.ciaf.edu.co/landing/public/img/aprobados.png'>
                                </div>
                                <div style='float:left; width: 70%;'>
                                    <font size='2px' color='#424040' face='Arial, Helvetica, sans-serif'>*Si recibes este correo es porque te inscribiste en uno de nuestros formularios. Recuerda que tus datos serán tratados conforme a la Ley 1266 de habeas data</font><br>
                                </div>
                        </div>
                    </td>
                </tr>
                </table>
            </div>		
            <table width='100%' border='0' cellpadding='10' cellspacing='0' align='center' bgcolor='#fff'>
                
                <tr>
                    <td bgcolor='#e6e6e6' style='text-align: center;'>
                    <font size='2px' color='#7f7f7f' face='Arial, Helvetica, sans-serif'>
                    Programas Profesional Universitarios por ciclos propedéuticos. Especializaciones a nivel de posgrado. Vigilada Ministerio de Educación.SNIES 4825 <br>    
                        <a style='color:#7f7f7f;' href="http://ciad.edu.co" target="_blank" rel="noopener noreferrer">www.ciaf.edu.co</a> / contacto@ciaf.edu.co / Carrera 6 No 24-56 Pereira, Colombia
                    </font>
                    </td>
                </tr>
            </table>
    
            <table width='100%' border='0' cellpadding='0' cellspacing='0' align='center' bgcolor='#fff' >
                <tr bgcolor='#064789'>	
                    <td>
                    <center>
                        
                    </center>
                    <br>
                    </td>
                </tr>
            </table>	
        </div>
    </div>
MESSAGE;

}
