import "./signin.scss";

export default function Signin() {
  return (
    <div>
      <div className="contactContainer">
        <div className="contactBloc">
          <h2>Sign In</h2>
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
              <h4>Password</h4>
              <div className="pseudoInput">
                <input type="password" placeholder="●●●●●●●●" />
              </div>
            </div>
            <button type="submit">
              <h3>Sign In</h3>
            </button>
          </form>
          <div className="textUnderButton">
            <p className="underButton">
              I'm new user.{" "}
              <a
                href="https://www.figma.com/design/FBKn4sUw9hrwRsiNdmsFsC/Maquette_origins_digital?node-id=0-1&t=Zt3LBqJmnhRMfwgn-0"
                target="_blank"
                rel="noreferrer"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
