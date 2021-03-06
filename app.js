window.addEventListener("load", () => {
	let long;
	let lat;
	let temperatureDesciption = document.querySelector(
		".temperature-description"
	);
	let temperatureDegree = document.querySelector(".temperature-degree");
	let locationTimezone = document.querySelector(".location-timezone");
	let temperatureSection = document.querySelector(".temperature");
	const temperatureSpan = document.querySelector(".temperature span");
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = "https://cors-anywhere.herokuapp.com/";
			const api = `${proxy}https://api.darksky.net/forecast/31aec53494cf76f130551475a8eaf91d/${lat},${long}`;

			fetch(api)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					const { temperature, summary, icon } = data.currently;
					//   set DOM ELEMENTS FROM THE API
					temperatureDegree.textContent = temperature;
					temperatureDesciption.textContent = summary;
					locationTimezone.textContent = data.timezone;
					// formula for celcius
					let celsius = ((temperature - 32) * 5) / 9;

					//   set Icon
					setIcons(icon, document.querySelector(".icon"));
					// change fareinheight to Celcius
					temperatureSection.addEventListener("click", () => {
						if (temperatureSpan.textContent === "F") {
							temperatureSpan.textContent = "C";
							temperatureDegree.textContent = Math.floor(celsius);
						} else {
							temperatureSpan.textContent = "F";
							temperatureDegree.textContent = temperature;
						}
					});
				});
		});
	}

	function setIcons(icon, iconID) {
		const skycons = new Skycons({ color: "white" });
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});
