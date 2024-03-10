import constants from "./constants";

const resetPasswordHtml = (props: {email: string, changePasswordLink: string}) => `
  <div style="padding: 30px 5px;">
    <div style="max-width: 700px; box-sizing: border-box; margin: 0 auto;">
      <div>
        <img
          src=${constants.appLogo}
          alt="inschool logo"
          style="width: 30px; height: 30px;"
        />
      </div>

      <div style="margin-top: 20px; border: 1px solid #ccc; text-align: center; border-radius: 4px; padding: 40px 30px;">
        <h1 style="font-size: 1.1rem; font-weight: 600; margin: 0; color: black;">Reset your password</h1>
        <p style="color: #555; padding: 3px 10px; font-size: .9rem;">
          A request was made to change the password for
          <span style="color: #1a8cff;">${props.email}</span>. If you didn’t intend to change your
          password you can ignore this email to leave your password unchanged.
        </p>

        <div style="flex-grow: 0;">
          <a href=${props.changePasswordLink} target="_blank" style="text-decoration: none; cursor: pointer;">
            <button style="background-color: #1a8cff; padding: 8px 12px; color: #fff; border: none;
                  border-radius: 4px; cursor: pointer; transition: background-color 0.2s;" 
                  onmouseover="this.style.backgroundColor='#0077ef'" 
                  onmouseout="this.style.backgroundColor='#1a8cff'" 
                  onclick="this.style.backgroundColor='#1a8cff'"
                >
                Change my password
              </button>
          </a>
        </div>
      </div>
    </div>
  </div>
`;

const mailTemplates = {
  resetPasswordHtml,
}

export default mailTemplates;