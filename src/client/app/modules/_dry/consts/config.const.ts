declare var window: Window;
const CONFIG = {
	socket: 'http://localhost:4136'
};
if ( window.location.hostname !== 'localhost' ) {
	CONFIG.socket = 'https://pp2-rental.herokuapp.com';
}
export { CONFIG }
