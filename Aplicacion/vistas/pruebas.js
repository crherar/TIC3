    // componentWillMount() {
    //     var config = {
    //         apiKey: "AIzaSyBTtliWubQSlMugDRkJ_Uh5Ui6PDmamoAM",
    //         authDomain: "tic3-35e16.firebaseapp.com",
    //         databaseURL: "https://tic3-35e16.firebaseio.com",
    //         projectId: "tic3-35e16",
    //         storageBucket: "tic3-35e16.appspot.com",
    //         messagingSenderId: "492482702985"
    //       };
    //       firebase.initializeApp(config);
    //       //console.log(firebase);
    //       var dbRef = firebase.database().ref().child('prueba');
    // }

    

        var url = 'https://example.com/profile';
        var data = {username: 'example'};
        
        fetch(url, {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));