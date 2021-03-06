const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var clear = require('clear');

//Crear objeto de conexion

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'tic3',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

// Establecer conexion

con.connect(function(err) {
  if (err) {
    console.error('Error de conexion: ' + err.stack);
    return;
  }
  console.log('Conectado con el ID: ' + con.threadId);
});

const app = express();

app.use(bodyParser.json());

/************************************************************************************************************
*********************************************** LOGIN USUARIO ***********************************************
*************************************************************************************************************/ 

app.post('/login', urlencodedParser, function(req,res){

  var email = req.body.email;
  var password = req.body.password;

  console.log("\n\nDATOS OBTENIDOS LOGIN:\n");
  console.log("Email: " + email + "\n" + "Password: " + password + "\n");

  con.query('SELECT * FROM usuarios WHERE email = ?',[email], function (error, results, fields) {
  if (error) {
    res.send({
      code: 400,
      error: error
    });
  }else{
    if(results.length > 0){
      if(results[0].password == password){
        var token = jwt.sign({user:email}, 'SecretKey');
        res.send({
          status: 200,
          success: "Logeo exitoso.",
          token: token
        });
      }
      else{
        res.send({
          code: 204,
          success: "Usuario y/o password incorrectos."
        });
      }
    }
    else{
      res.send({
        code: 204,
        success: "El email ingresado no existe o es incorrecto."
      });
    }
  }
  });
});

// Formato del token
// authorization: Bearer <access_token>

function verificarToken(req, res, next) {
  
  console.log('\n\nverificarToken req.headers:\n\n', req.headers);
  
  // Obtener 'authorization' del header
  const bearerHeader = req.headers['authorization'];

  // Comprobar que no sea indefinido
  if (typeof bearerHeader !== 'undefined') {
    // Separar en el espacio
    const bearer = bearerHeader.split(' ');
    // Obtener token
    const bearerToken = bearer[1];
    // Setear el token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

/************************************************************************************************************
*********************************************** CONSULTAR DISPOSITIVOS **************************************
*************************************************************************************************************/ 

// app.post('/consultarDispositivos', urlencodedParser, verificarToken, function(req, res) {

app.post('/consultarDispositivos', urlencodedParser, function(req, res) {

  console.log("\n\n ---- EJECUTANDO /consultarDispositivos... ----\n");

  console.log("\nDatos obtenidos desde DashboardPrincipal.js:\n\n", req.body, "\n\n");

  var email = req.body.email;

  // jwt.verify(req.token, 'SecretKey', (err, authData) => {
  //   if(err) {
  //     console.log(err);
  //     console.log(req.token);
  //     res.send({
  //       code: 403,
  //       error: err
  //     });
  //   } else {
      con.query('SELECT dispositivos.id, dispositivos.nombre \
             from usuariosDispositivos INNER JOIN usuarios ON usuariosDispositivos.userEmail = usuarios.Email \
             INNER JOIN dispositivos ON usuariosDispositivos.dispositivoId = dispositivos.id \
             WHERE usuarios.email = ?', [email], function(error, results, fields) {   
              if (error) {
                res.send({
                  mensaje: 'Error al consultar los dispositivos.'
                });
              } else {
                res.send({
                  datos: results
                });
              }
             }
      );
  //   }
  // });
});

/************************************************************************************************************
*********************************************** VISUALIZAR DISPOSITIVOS *************************************
*************************************************************************************************************/ 


//app.post('/visualizarDispositivo', urlencodedParser, verificarToken, function(req, res) {

app.post('/visualizarDispositivo', urlencodedParser, function(req, res) {

  console.log("\n\n ---- EJECUTANDO /visualizarDispositivo... ----\n");

  console.log("\nDatos obtenidos desde visualizarDispositivo.js:\n\n", req.body, "\n\n");

  var id = req.body.idDispositivo;
  var email = req.body.email;

  // jwt.verify(req.token, 'SecretKey', (err, authData) => {
  //   if(err) {
  //     console.log(err);
  //     console.log(req.token);
  //     res.send({
  //       code: 403,
  //       error: err
  //     });
  //   } else {

      con.query('SELECT incubacion.id, \
                        incubacion.nombre, \
                        incubacion.tipoAve, \
                        incubacion.cantHuevos,\
                        incubacion.fechaInicio, \
                        incubacion.fechaVolteo, \
                        incubacion.fechaFin, \
                        incubacion.estado, \
                        incubacion.temperatura, \
                        incubacion.humedad \
                FROM incubacion \
                INNER JOIN dispositivoIncubacion on incubacion.id = dispositivoIncubacion.idIncubacion \
                WHERE dispositivoIncubacion.idDispositivo = ? AND dispositivoIncubacion.userEmail = ?', [id, email], function(error, results, fields) {   
              if (error) {
                res.send(400);
              } else {
                res.send({
                  datos: results
                });
              }
             }
      );
  //   }
  // });
});

/************************************************************************************************************
*********************************************** VISUALIZAR DISPOSITIVOS *************************************
*************************************************************************************************************/ 


//app.post('/visualizarDispositivo', urlencodedParser, verificarToken, function(req, res) {

  app.post('/visualizarIncubacion', urlencodedParser, function(req, res) {

    console.log("\n\n ---- EJECUTANDO /visualizarIncubacion... ----\n");
  
    console.log("\nDatos obtenidos desde visualizarIncubacion.js:\n\n", req.body, "\n\n");
  
    var id = req.body.idIncubacion;
    var email = req.body.email;

  
    // jwt.verify(req.token, 'SecretKey', (err, authData) => {
    //   if(err) {
    //     console.log(err);
    //     console.log(req.token);
    //     res.send({
    //       code: 403,
    //       error: err
    //     });
    //   } else {
  
        con.query('SELECT incubacion.id, \
                          incubacion.nombre, \
                          incubacion.tipoAve, \
                          incubacion.cantHuevos,\
                          incubacion.fechaInicio, \
                          incubacion.fechaVolteo,\
                          incubacion.fechaFin, \
                          incubacion.estado, \
                          incubacion.temperatura, \
                          incubacion.humedad \
                  FROM incubacion \
                  INNER JOIN dispositivoIncubacion on incubacion.id = dispositivoIncubacion.idIncubacion \
                  WHERE dispositivoIncubacion.idIncubacion = ? AND dispositivoIncubacion.userEmail = ?', [id, email], function(error, results, fields) {   
                if (error) {
                  res.send(400);
                } else {
                  if (results[0].estado == '1') {
                    results[0].estado = 'Activa';
                  } else {
                    results[0].estado = 'Cerrada';
                  }
                  res.send({
                    datos: results
                  });
                }
               }
        );
    //   }
    // });
  });

/************************************************************************************************************
*********************************************** ELIMINAR INCUBACIÓN *****************************************
*************************************************************************************************************/ 


//app.post('/visualizarDispositivo', urlencodedParser, verificarToken, function(req, res) {

  app.post('/eliminarIncubacion', urlencodedParser, function(req, res) {

    console.log("\n\n ---- EJECUTANDO /eliminarIncubacion... ----\n");
  
    console.log("\nDatos obtenidos desde visualizarIncubacion.js:\n\n", req.body, "\n\n");
  
    var id = req.body.idIncubacion;
    var email = req.body.email;

    // jwt.verify(req.token, 'SecretKey', (err, authData) => {
    //   if(err) {
    //     console.log(err);
    //     console.log(req.token);
    //     res.send({
    //       code: 403,
    //       error: err
    //     });
    //   } else {
  
        con.query('DELETE FROM incubacion WHERE id = ?', [id, email], function(error, results, fields) {   
                if (error) {
                  console.log(error);
                  // res.send({
                  //   mensaje: "Error al eliminar la incubación."
                  // });
                } else {
                  console.log("Incubación eliminada satisfactoriamente de tabla incubacion...");
                  // res.send({
                  //   mensaje: "Incubación eliminada satisfactoriamente."
                  // });
                }
            

            con.query('DELETE FROM dispositivoIncubacion WHERE idIncubacion = ? AND userEmail = ?', [id, email], function(error, results, fields) {   
              if (error) {
                console.log(error);
                res.send({
                  mensaje: "Error al eliminar la incubación."
                }) 
                } else {
                console.log("Incubación eliminada satisfactoriamente de tabla dispositivoIncubacion...");
                res.send({
                  datos: "Incubación eliminada satisfactoriamente."
                });
              }
             }
            );
          }
        );
    //   }
    // });
  });

/************************************************************************************************************
*********************************************** ELIMINAR DISPOSITIVO ****************************************
*************************************************************************************************************/ 


//app.post('/visualizarDispositivo', urlencodedParser, verificarToken, function(req, res) {

  app.post('/eliminarDispositivo', urlencodedParser, function(req, res) {

    console.log("\n\n ---- EJECUTANDO /eliminarDispositivo... ----\n");
  
    console.log("\nDatos obtenidos desde visualizarDispositivo.js:\n\n", req.body, "\n\n");
  
    var id = req.body.idDispositivo;
    var email = req.body.email;

  
    // jwt.verify(req.token, 'SecretKey', (err, authData) => {
    //   if(err) {
    //     console.log(err);
    //     console.log(req.token);
    //     res.send({
    //       code: 403,
    //       error: err
    //     });
    //   } else {
  
        con.query('DELETE FROM dispositivos WHERE id = ?', [id, email], function(error, results, fields) {   
                if (error) {
                  console.log(error);
                  // res.send({
                  //   mensaje: "Error al eliminar el dispositivo."
                  // });
                } else {
                  console.log("Dispositivo eliminado satisfactoriamente.");
                  // res.send({
                  //   mensaje: "Dispositivo eliminado satisfactoriamente."
                  // });
                }
       

          con.query('DELETE FROM usuariosDispositivos WHERE dispositivoId = ? AND userEmail = ?', [id, email], function(error, results, fields) {   
            if (error) {
              console.log(error);
              res.send({
                mensaje: "Error al eliminar el dispositivo."
              }) 
              } else {
              res.send({
                datos: "Dispositivo eliminado satisfactoriamente."
              });
            }
          }
          );
        }
      );
    //   }
    // });
  });

/************************************************************************************************************
*********************************************** APAGAR DISPOSITIVO ****************************************
*************************************************************************************************************/ 


//app.post('/visualizarDispositivo', urlencodedParser, verificarToken, function(req, res) {

  app.post('/Estado', urlencodedParser, function(req, res) {

    console.log("\n\n ---- EJECUTANDO /Estado... ----\n");
  
    console.log("\nDatos obtenidos desde visualizarDispositivo.js:\n\n", req.body, "\n\n");
  
    // jwt.verify(req.token, 'SecretKey', (err, authData) => {
    //   if(err) {
    //     console.log(err);
    //     console.log(req.token);
    //     res.send({
    //       code: 403,
    //       error: err
    //     });
    //   } else {
  
    var datos = {
      id: req.body.idDispositivo,
      estado: req.body.estado,
    }

    con.query('UPDATE dispositivos SET estado=? WHERE id=?', [datos.estado, datos.id], function (error, results, fields) {
      if (error) {
        console.log("\n\nERROR:\n\n", error, "\n\n");
        res.send({
          mensaje: error.code
        })
      } else {
        if (datos.estado == '1') {
            var codigo = datos.estado;
            var mensaje = "Dispositivo encendido - seteado a 1."
          } else if (datos.estado == '0') {
            var codigo  = datos.estado;
            var mensaje = "Dispositivo apagado - seteado a 0."
        }
        res.send({
          codigo: datos.estado,
          mensaje: mensaje
        })
      }
      });

  });

/************************************************************************************************************
*********************************************** APAGAR DISPOSITIVO ****************************************
*************************************************************************************************************/ 


//app.post('/visualizarDispositivo', urlencodedParser, verificarToken, function(req, res) {

  app.get('/EstadoLeer', urlencodedParser, function(req, res) {

    console.log("\n\n ---- EJECUTANDO /EstadoLeer... ----\n");
  
    console.log("\nDatos obtenidos desde Raspberry:\n\n", req.body, "\n\n");
  
    // jwt.verify(req.token, 'SecretKey', (err, authData) => {
    //   if(err) {
    //     console.log(err);
    //     console.log(req.token);
    //     res.send({
    //       code: 403,
    //       error: err
    //     });
    //   } else {
  
    var datos = {
      id: req.body.id,
    }

    con.query('SELECT estado FROM dispositivos WHERE id = ?', [datos.id], function (error, results, fields) {
      if (error) {
        console.log("\n\nERROR:\n\n", error, "\n\n");
        res.send({
          mensaje: error.code
        })
      } else {
        if (datos.estado == '1') {
            //var codigo = datos.estado;
            var mensaje = "Dispositivo encendido - seteado a 1."
          } else if (datos.estado == '0') {
            //var codigo  = datos.estado;
            var mensaje = "Dispositivo apagado - seteado a 0."
        }
        res.send({
          codigo: results[0].estado,
          mensaje: mensaje
        })
      }
      });

  });
  

/************************************************************************************************************
*********************************************** APAGAR DISPOSITIVO ****************************************
*************************************************************************************************************/ 


//app.post('/visualizarDispositivo', urlencodedParser, verificarToken, function(req, res) {

  app.post('/apagarDispositivo', urlencodedParser, function(req, res) {

    console.log("\n\n ---- EJECUTANDO /apagarDispositivo... ----\n");
  
    console.log("\nDatos obtenidos desde visualizarDispositivo.js:\n\n", req.body, "\n\n");
  
    // jwt.verify(req.token, 'SecretKey', (err, authData) => {
    //   if(err) {
    //     console.log(err);
    //     console.log(req.token);
    //     res.send({
    //       code: 403,
    //       error: err
    //     });
    //   } else {
  
    res.send({mensaje:"recibido"});

    con.query('INSERT INTO usuarios SET ?', datos, function (error, results, fields) {
      if (error) {
        console.log("\n\nERROR:\n\n", error.code, "\n\n");
        res.send({
          mensaje: error.code
        })
      } else {
        res.send({
          mensaje: "El usuario se ha creado exitosamente."
        });
      }
      });

  });


/************************************************************************************************************
*********************************************** REGISTRO DE USUARIO *****************************************
*************************************************************************************************************/ 

app.post('/registro', urlencodedParser, function(req,res){

  var datos = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    password: req.body.password
  }

  console.log("\n\nDATOS OBTENIDOS:\n\n", datos, "\n\n");

  con.query('INSERT INTO usuarios SET ?', datos, function (error, results, fields) {
  if (error) {
    console.log("\n\nERROR:\n\n", error.code, "\n\n");
    res.send({
      mensaje: error.code
    })
  } else {
    res.send({
      mensaje: "El usuario se ha creado exitosamente."
    });
  }
  });
});

/************************************************************************************************************
*********************************************** OBTENER DISPOSITIVOS ****************************************
*************************************************************************************************************/

app.post('/obtenerDispositivos', urlencodedParser, function(req, res) {

  console.log("\n\n ---- EJECUTANDO /obtenerDispositivos... ----\n");

  console.log("\nDatos obtenidos desde AgregarDispositivo.js:\n\n", req.body, "\n\n");

  con.query('SELECT dispositivos.id \
  FROM usuariosDispositivos INNER JOIN usuarios ON usuariosDispositivos.userEmail = usuarios.Email \
  INNER JOIN dispositivos ON usuariosDispositivos.dispositivoId = dispositivos.id \
  WHERE usuarios.email = ?', req.body.email, function(error, results, fields) {
    if (error) {
      throw error;
    } else {
      var dispositivos = [];
      for (var i = 0; i < results.length; i++) {
        dispositivos.push(results[i].id.toString());
    }   
      console.log(dispositivos);
      res.send({
        datos: dispositivos
      });
    }
  });
});

/************************************************************************************************************
*********************************************** AGREGAR INCUBACION ******************************************
*************************************************************************************************************/ 

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

app.post('/agregarIncubacion', urlencodedParser, function(req,res) {

  console.log("\n\n ---- EJECUTANDO /agregarIncubacion... ----");
  console.log("\n\nDatos obtenidos desde AgregarIncubacion.js:\n\n", req.body);

  con.query('SELECT ave.id, ave.dias, ave.diaVoltear FROM ave WHERE ave.nombre = ?', [req.body.tipoAve], function (err, result, fields) {
    if (err) throw err;

    // fechaFin = fechaInicio + diasIncubacion
    // fechaVolteo = fechaInicio + diaVoltear

    var aveId = result[0].id;
    var diasIncubacion = result[0].dias;
    var diasVoltear = result[0].diaVoltear;

    console.log("\nDatos DB:\n");

    console.log("aveId:", aveId);
    console.log("diasIncubacion:", diasIncubacion);
    console.log("diaVoltear:", diasVoltear);

    /* Calculo de las fechas de inicio, de volteo y final en formato DATETIME */

    console.log("\nDatos calculados:\n");

    var fechaInicio = new Date(req.body.fechaInicio);
    var fechaVolteo = fechaInicio.addDays(diasVoltear);
    var fechaFin = fechaInicio.addDays(diasIncubacion);

    console.log("fechaVolteo:", fechaVolteo);
    console.log("fechaVolteo:", fechaVolteo);
    console.log("fechaFinal:", fechaFin);

    var idIncubacion = new Date().getUTCMilliseconds();
    console.log("idIncubacion:", idIncubacion);

    var datos = {
      id: idIncubacion,
      nombre: req.body.nombre,
      cantHuevos:req.body.cantHuevos,
      fechaInicio: fechaInicio,
      fechaVolteo: fechaVolteo,
      fechaFin: fechaFin,
      tipoAve: aveId,
      estado: 1,
    }

  con.query('INSERT INTO incubacion SET ?', datos, function (error, results, fields) {
    if (error) {
      console.log("\n\nERROR:\n\n", error, "\n\n");
      res.send({
        mensaje: error
      })
    } else {
      var idDispositivo = req.body.idDispositivo;

      var datos = {
        idDispositivo: idDispositivo,
        idIncubacion: idIncubacion,
        userEmail: req.body.email,
      }
    
      con.query('INSERT INTO dispositivoIncubacion SET ?', datos,  function (error, results, fields) {
        if (error) {
          console.log("\n\nERROR:\n\n", error, "\n\n");
          res.send({
            code:400,
            mensaje: error
          })
        } else {
          res.send({
            code:200,
            mensaje: "La incubación se ha creado exitosamente."
          });
        }
      }); 
    }
  });
  });
});

/************************************************************************************************************
*********************************************** AGREGAR DISPOSITIVO ******************************************
*************************************************************************************************************/ 


app.post('/agregarDispositivo', urlencodedParser, function(req,res) {

  console.log("\n\n ---- EJECUTANDO /agregarDispositivo... ----");
  console.log("\n\nDatos obtenidos desde AgregarDispositivo.js:\n\n", req.body);

    var datos = {
      id: req.body.idDispositivo,
      nombre: req.body.nombre,
      email: req.body.email
    }

    con.query('INSERT INTO dispositivos SET id = ?, nombre = ?', [datos.id, datos.nombre], function (error, results, fields) {
    if (error) {
      console.log("\n\nERROR:\n\n", error, "\n\n");
      res.send({
        errorCode:error.code,
        codigo:400,
        mensaje: "Error al agregar el dispositivo."
      })
      return;
    } else {
      con.query('INSERT INTO usuariosDispositivos SET dispositivoId = ?, userEmail = ?', [datos.id, datos.email], function (error, results, fields) {
        if (error) {
          console.log("\n\nERROR:\n\n", error, "\n\n");
          res.send({
            codigo: 400,
            mensaje: "Error al agregar el dispositivo."
          })
        } else {
          res.send({
            code: 200,
            mensaje: "El dispositivo se ha agregado exitosamente."
          });
        }
      }); 

    }
  });


  });


/************************************************************************************************************
******************************************** ENVIO DE DATOS SENSORES ****************************************
*************************************************************************************************************/ 

app.post('/datosSensores', urlencodedParser, function (req, res) {

  console.log('datos recibidos:', req.body)

  var datos = {
    id: req.body.id,
    temperatura: req.body.temperatura,
    humedad: req.body.humedad
  }

con.query('SELECT idIncubacion FROM dispositivoIncubacion WHERE idDispositivo=?', [datos.id], function (error, results, fields) {
  if (error) {
    console.log("\n\nERROR select:\n\n", error, "\n\n");
    res.send({
      mensaje:error
    });
  } else {
    console.log("idIncubacion: ", results[0].idIncubacion);
    var idIncubacion = results[0].idIncubacion;
    con.query('UPDATE incubacion SET temperatura=?, humedad=? WHERE id=?', [datos.temperatura, datos.humedad, idIncubacion], function (error, results, fields) {
      if (error) {
        console.log("\n\nERROR incubacion:\n\n", error, "\n\n");
        res.send({
          mensaje: error
        })
      } else {
        res.send({
          mensaje: 'Datos escritos en la base de datos.'
        })
      }
      });
  }
});
});


app.listen(port='3000', () => {
  console.log("Servidor corriendo en puerto", port);
});