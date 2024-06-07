import "./forget.scss";

export default function Forget() {
  return (
    <div>
      <div className="contactContainer">
        <div className="contactBloc">
          <h2>Forget Password</h2>
          <form className="contactForm">
            <div className="row formRow">
              <h4>Email Address</h4>
              <div className="pseudoInput">
                <input type="text" placeholder="mikael.jackson@gmail.com" />
              </div>
            </div>
            <button type="submit">
              <h3>Send</h3>
            </button>
          </form>
          <div className="textUnderButton">
            <p className="underButton">
              I'm new user. <span>Sign Up</span>
            </p>
            <p className="underButton">
              Already have an account. <span>Sign In</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
