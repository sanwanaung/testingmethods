const app = document.querySelector(".app");
const userName = document.querySelector("#userName");
const userEmail = document.querySelector("#userEmail");
const userAge = document.querySelector("#userAge");

const url = "http://localhost:80/users";

// Updating User Interface
const updateUI = (userInfo) => {
  const usersDiv = document.createElement("div");
  usersDiv.classList.add("usersDiv");
  for (let i = 0; i < userInfo.length; i++) {
    const user = userInfo[i];
    const userDiv = document.createElement("div");
    userDiv.classList.add("userDiv");
    userDiv.innerHTML = `
            <div class="btn-container">
                <div class="user-name">${user.name}</div>
                <div class="btn-box">
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        data-bs-whatever="@mdo"
                      >
                        UpdateUser
                    </button>
                    <button type="button" class="btn btn-danger" id="${user.email}" onclick="deleteUser(event)">Delelte</button>
                </div>
            </div>
        `;
    usersDiv.append(userDiv);
  }
  app.append(usersDiv);
};

// Register User
const registerUser = async () => {
  const name = userName.value;
  const email = userEmail.value;
  const age = userAge.value;
  if (!name && !email && !age) {
    return;
  }
  const newUserInfo = { name, email, age };
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(newUserInfo),
  });
  const data = await response.json();
  document.querySelector("#userName").value = "";
  document.querySelector("#userEmail").value = "";
  document.querySelector("#userAge").value = "";
  app.innerHTML = "";
  updateUI(data);
};

// Deleting User
const deleteUser = async (event) => {
  const userId = event.target.id;
  const deleteUserId = { email: userId };
  const response = await fetch(url, {
    method: "DELETE",
    body: JSON.stringify(deleteUserId),
  });
  const data = await response.json();
  app.innerHTML = "";
  updateUI(data);
};

// Update User
const updateUser = async () => {
  const name = document.querySelector(".newname").value;
  const email = document.querySelector(".oldemail").value;
  const age = document.querySelector(".newage").value;
  const userInfo = { name, email, age };
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(userInfo),
  });
  const data = await response.json();
  console.log(data);
  document.querySelector(".newname").value = "";
  document.querySelector(".oldemail").value = "";
  document.querySelector(".newage").value = "";
  app.innerHTML = "";
  updateUI(data);
};

// Data fetch From Server
const fetchData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  updateUI(data);
};

fetchData();
