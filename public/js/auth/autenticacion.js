class Autenticacion {
	autEmailPass(email, password) {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((result) => {
				if (result.user.emailVerified) {
					$("#avatar").attr("src", "imagenes/usuario_auth.png");
					Materialize.toast(`Bienvenido ${result.user.displayName}`, 5000);
				} else {
					firebase.auth().signOut();
					Materialize.toast(
						`Por favor realiza la verificacion de tu correo electronico}`,
						5000
					);
				}

				$(".modal").modal("close");
			})
			.catch((err) => {
				console.error(err);
				Materialize.toast(err.message, 4000);
			});
	}

	crearCuentaEmailPass(email, password, nombres) {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				result.user.updateProfile({
					displayName: nombres,
				});

				// Verificar el correo
				const configuracion = {
					url: "http://localhost:3000/",
				};
				result.user.sendEmailVerification(configuracion).catch((err) => {
					console.err(err);
					Materialize.toast(err.message, 4000);
				});

				firebase.auth().signOut();

				Materialize.toast(
					`Bienvenido ${nombres}, debes realizar el proceso de verificación`,
					4000
				);
				$(".modal").modal("close");
			})
			.catch((err) => {
				console.error(err);
				Materialize.toast(err.message, 4000);
			});
	}

	authCuentaGoogle() {
		const provider = new firebase.auth.GoogleAuthProvider();

		firebase
			.auth()
			.signInWithPopup(provider)
			.then((result) => {
				$("#avatar").attr("src", result.user.photoURL);
				$(".modal").modal("close");
				Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000);
			})
			.catch((err) => {
				console.error(err);
				Materialize.toast(err.message, 4000);
			});
	}

	authCuentaFacebook() {
		const provider = new firebase.auth.FacebookAuthProvider();

		firebase
			.auth()
			.signInWithPopup(provider)
			.then((result) => {
				$("#avatar").attr("src", result.user.photoURL);
				$(".modal").modal("close");
				Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000);
			})
			.catch((err) => {
				console.error(err);
				Materialize.toast(err.message, 4000);
			});
	}

	authTwitter() {
		// TODO: Crear auth con twitter
	}
}
