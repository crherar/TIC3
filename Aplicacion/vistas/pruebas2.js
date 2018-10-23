    //     let isError = true;
    //     const errores = {};

    //     if (this.state.nombre < 3) {
    //         isError = true;
    //         errores.nombreError = "El nombre debe ser al menos de 3 letras.";
    //     }
    //     if (isError) {
    //         this.setState(errores);
    //     }


    // validar = () => {
    //     let isError = false;
    //     const errores = {
    //         nombreError:'', 
    //         apellidoError:'',
    //         emailError:'',
    //         passwordError:'',
    //     };

    //     if (this.state.username.length < 5) {
    //       isError = true;
    //       errors.usernameError = "Username needs to be atleast 5 characters long";
    //     }
    
    //     if (this.state.email.indexOf("@") === -1) {
    //       isError = true;
    //       errors.emailError = "Requires valid email";
    //     }
    
    //     this.setState(errores);
    
    //     return isError;
    //   };

      
    // onSubmit = e => {
    //     e.preventDefault();
    //     // this.props.onSubmit(this.state);
    //     const err = this.validar();
    //     if (!err) {
    //       // clear form
    //       this.setState({
    //         nombre:'',
    //         nombreError:'', 
    //         apellido:'',
    //         apellidoError:'',
    //         email:'',
    //         emailError:'',
    //         password:'',
    //         passwordError:'',
    //       });
    //     }
    //     on.onSubmit()
    // }



    //     onPressLogin() {

    //     const{email, password} = this.state; // destructuracion de objetos
    //     var datos = {'email': email, 'password': password}
    //     console.log(datos);
    //     fetch('http://192.168.100.5:3000/login', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(datos),
    //     }).then(res => res.json())
    //     .catch(error => console.error('Error:', error))
    //     .then(response => console.log('Success:', response));
    // }


    if (nombre == ""){
        alert('El campo de nombre no puede estar vacío.');
        // nombre.style.borderColor = "red";
        return false;
    }
    if (apellido == "") {
        alert('El campo de apellido no puede estar vacío.');
        return false;
    }
    if (email == "") {
        alert('El campo de apellido no puede estar vacío.');
        return false;
    }
    if (password1 == "") {
        alert('El campo de apellido no puede estar vacío.');
        return false;
    }
    if (apellido == "") {
        alert('El campo de apellido no puede estar vacío.');
        return false;
    }
    if (/^[0-9]+$/.test(nombre)) {
        alert("El campo de nombre solo puede contener letras.");
        return false;
    }
    if (/^[0-9]+$/.test(apellido)) {
        alert("El campo de apellido solo puede contener letras.");
        return false;
    }
    if (password1 != password2) {
        alert("Las contraseñas no coinciden.");
        return false;
    }
    if(nombre.length <= 2){
        alert('El nombre ingresado es muy corto');
        //document.getElementById('firstname').style.borderColor = "red";
        return false;
    }
    if(apellido.length <= 2){
        alert('El nombre ingresado es muy corto');
        //document.getElementById('firstname').style.borderColor = "red";
        return false;
    } 
