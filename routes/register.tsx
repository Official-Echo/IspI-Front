import { defineRoute } from "$fresh/server.ts";

export default defineRoute(() => {
  return (
    <div class="register-page">
      <h3>Register</h3>
      <form action="/api/register" method="POST">
        <label>
          Name:
          <input type="text" name="pib" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <label>
          Phone Number:
          <input type="text" name="phone_number" required />
        </label>
        <label>
          Role:
          <select name="role" required>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </label>
        <label>
          Bank Card Number:
          <input type="text" name="bank_card_number" required />
        </label>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
});
