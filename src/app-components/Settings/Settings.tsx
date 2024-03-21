import Dashboard from "../Dashboard/Dashboard";
import instance from "../../app-utils/axios";
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
export const Settings = () => {
  const [userData, setUserData] = React.useState({});
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [newPassword2, setNewPassword2] = React.useState("");

  const showToast = (message, id, type) => {
    if (type === "success") {
      if (!toast.isActive(id)) {
        toast.success(message, {
          toastId: id,
        });
      }
    } else if (type === "error") {
      if (!toast.isActive(id)) {
        toast.error(message, {
          toastId: id,
        });
      }
    } else {
      if (!toast.isActive(id)) {
        toast(message, {
          toastId: id,
        });
      }
    }
  };

  useEffect(() => {
    try {
      jwtDecode(localStorage.getItem("access_token"));
      let data = jwtDecode(localStorage.getItem("access_token"));
      setUserData(data);
    } catch (error) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  }, []);

  const SettingsFunctions = {
    async logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/app/login";
    },
    async changeUsername() {
      if (username.length < 2) {
        showToast("Потребителското име трябва да е поне 2 символа", 1, "error");
        return;
      }
      if (username.length > 40) {
        showToast(
          "Потребителското име трябва да е най-много 40 символа",
          2,
          "error"
        );
        return;
      }
      try {
        const response = await instance.put("/users/" + userData.sub, {
          username: username,
        });
        showToast("Готово, промени потребителското си име", 3, "success");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/app/login";
      } catch (error) {
        if (error.response.status === 409) {
          showToast("Потребителското име вече е заето", 3, "error");
        } else {
          showToast(
            "Неуспешна промяна на потребителско име. Пробвай отново по-късно.",
            4,
            "error"
          );
        }
      }
    },
    async changeEmail() {
      if (!email.includes("@")) {
        showToast("Невалиден имейл", 5, "error");
        return;
      }
      try {
        const response = await instance.put("/users/" + userData.sub, {
          email: email,
        });
        showToast("Готово, промени имейла си", 6, "success");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/app/login";
      } catch (error) {
        if (error.response.status === 409) {
          showToast("Имейлът вече е зает", 6, "error");
        } else {
          showToast(
            "Неуспешна промяна на имейл. Пробвай отново по-късно.",
            7,
            "error"
          );
        }
      }
    },
    async changePassword() {
      if (newPassword.length < 8) {
        showToast("Паролата трябва да е поне 8 символа", 8, "error");
        return;
      }
      if (newPassword.length > 40) {
        showToast("Паролата трябва да е най-много 40 символа", 9, "error");
        return;
      }
      if (!/[A-Z]/.test(newPassword)) {
        showToast(
          "Паролата трябва да съдържа поне една главна буква",
          10,
          "error"
        );
        return;
      }
      if (!/[a-z]/.test(newPassword)) {
        showToast(
          "Паролата трябва да съдържа поне една малка буква",
          11,
          "error"
        );
        return;
      }
      if (!/\d/.test(value)) {
        showToast("Паролата трябва да съдържа поне една цифра", 12, "error");
        return;
      }
      if (newPassword !== newPassword2) {
        showToast("Паролите не съвпадат", 13, "error");
        return;
      }
      try {
        const response = await instance.put("/users/" + userData.sub, {
          password: newPassword,
          new_password: newPassword,
        });
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/app/login";
      } catch (error) {
        showToast(
          "Неуспешна промяна на парола. Пробвай отново по-късно",
          14,
          "error"
        );
      }
    },
    exportData() {
      showToast("Изпратихме заявки. Изчакай 30 сек на тази страница.", 15, "");
      instance
        .get("/users/" + userData.sub)
        .then((response) => {
          //download a json file
          const element = document.createElement("a");
          const file = new Blob([JSON.stringify(response.data.user_info)], {
            type: "application/json",
          });
          element.href = URL.createObjectURL(file);
          element.download = "zapomnigo_data.json";
          document.body.appendChild(element); // Required for this to work in FireFox
          element.click();
        })
        .catch((error) => {
          showToast(
            "Неуспешно изтегляне на данни. Пробвай отново по-късно",
            15,
            "error"
          );
        });
    },
    deleteAccount() {
      if (
        confirm(
          "Сигурен ли си, че искаш да изтриеш профила си заедно с всички данни?"
        ) === false
      )
        return;
      instance
        .delete("/users/" + userData.sub)
        .then((response) => {
          showToast("Готово, данните ти са изтрити", 16, "success");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/app/login";
        })
        .catch((error) => {
          showToast(
            "Неуспешно изтриване на данни. Свържи се с нас на zapomnigo.com@gmail.com, за да изтриеш профила си.",
            16,
            "error"
          );
        });
    },
  };
  Object.freeze(SettingsFunctions);
  return (
    <Dashboard>
      <div id="settings">
        {/* <center>
          <h1>Настройки</h1>
        </center> */}
        <section>
          <h2>Потребителски данни</h2>
          <ul>
            <div>
              <button onClick={() => SettingsFunctions.logout()}>
                Излез от профил
              </button>
            </div>
            <li>Смени потребителско име:</li>
            <div>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Ново потребителско име"
              />
              <button onClick={() => SettingsFunctions.changeUsername()}>
                Промени
              </button>
            </div>
            <li>Смени имейл:</li>
            <div>
              <input
                type="email"
                placeholder="Нов имейл"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={() => SettingsFunctions.changeEmail()}>
                Промени
              </button>
            </div>
            <li>Смени парола:</li>
            <div id="vertical-flex">
              <p>
                Паролата трябва да бъде поне 8 символа и да съдържа поне една
                главна буква, една малка буква и една цифра.
              </p>
              <input
                onChange={(e) => setCurrentPassword(e.target.value)}
                type="password"
                placeholder="Въведи сегашната парола"
              />
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                placeholder="Въведи новата парола"
              />
              <input
                onChange={(e) => setNewPassword2(e.target.value)}
                type="password"
                placeholder="Повтори новата парола"
              />
              <button onClick={() => SettingsFunctions.changePassword()}>
                Промени
              </button>
            </div>
            <li>Експортирай всички данни</li>
            <div>
              <p>Експортирай всички данни, които ЗапомниГо има за теб</p>
              <button onClick={() => SettingsFunctions.exportData()}>
                Експортирай
              </button>
            </div>
            <li>Изтрий данните и профила ми</li>
            <div>
              <p>
                Изтрий всички твои данни и профил. Заявката може да отнеме
                няколко минути в зависимост от размера на профила. Препоръчваме
                ти да изтеглиш данните си предварително.
              </p>
              <button onClick={() => SettingsFunctions.deleteAccount()}>
                Изтрий данните и профила ми
              </button>
            </div>
            <li>
              Не съм съгласен с общите условия/политиката за
              поверителност/политиката за бисквитки
            </li>
            <div>
              <p>
                Ако не се съгласяваш с общите условия, политиката за
                поверителност или политиката за бисквитки, можеш да изтриеш
                профила си.
              </p>
              <button onClick={() => SettingsFunctions.deleteAccount()}>
                Изтрий данните и профила ми
              </button>
            </div>
            <div>
              <li>
                За други промени по профила, свържи се с нас на{" "}
                <a href="mailto:zapomnigo.com@gmail.com">
                  zapomnigo.com@gmail.com
                </a>
              </li>
            </div>
          </ul>
          {/* MAKE THE SETTINGS BELOW WORK */}
          {/* <h2>Промени език</h2>
          <ul>
            <div>
              <p>
                Промяната на езика ще презареди страницата и ще промени езика на
                всички текстове.
              </p>
              <select>
                <option value="english">Английски</option>
                <option value="bulgarian">Български</option>
                <option value="german">Немски</option>
                <option value="french">Френски</option>
                <option value="spanish">Испански</option>
              </select>
            </div>
          </ul> */}
          {/* <h2>Учи</h2>
          <ul>
            <li>Минимален брой пъти, в който се показва флашкарта</li>
            <div>
              <p></p>
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="5">5</option>
              </select>
            </div>
            <li>Максимален брой пъти, в който се показва флашкарта</li>
            <div>
              <p></p>
              <select>
                <option value="9999">Без ограничение</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>
          </ul> */}
        </section>
      </div>
    </Dashboard>
  );
};
