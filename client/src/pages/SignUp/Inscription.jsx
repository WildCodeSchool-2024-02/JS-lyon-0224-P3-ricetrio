import "./inscription.scss";

export default function Inscription() {
  return (
    <div>
      <div className="contactContainer">
        <div className="contactBloc">
          <h2>Sign Up</h2>
          <form className="contactForm">
            <div className="row formRow">
              <h4>Pseudo</h4>
              <div className="pseudoInput">
                <input
                  className="textInput"
                  type="text"
                  placeholder="Michael J."
                />
              </div>
            </div>
            <div className="row formRow">
              <h4>Email Address</h4>
              <div className="pseudoInput">
                <input type="text" placeholder="mikael.jackson@gmail.com" />
              </div>
            </div>
            <div className="row formRow">
              <h4>Password</h4>
              <div className="pseudoInput">
                <input type="password" placeholder="●●●●●●●●" />
              </div>
            </div>
            <button type="submit">
              <h3>Sign Up</h3>
            </button>
          </form>
          <div className="textUnderButton">
            <p className="underButton">
              Already have an account. <span>Sign In</span>
            </p>
            <p className="underButton">
              I forgot my password. <span>Help</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
