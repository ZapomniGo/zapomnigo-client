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

  useEffect(() => {
    try {
      jwtDecode(localStorage.getItem("access_token"));
      let data = jwtDecode(localStorage.getItem("access_token"));
      setUserData(data);
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  }, []);

  const SettingsFunctions = {
    async logout() {
      localStorage.removeItem("token");
      window.location.href = "/";
    },
    async changeUsername() {
      if (username.length < 4) {
        toast.error("Потребителското име трябва да е поне 4 символа");
        return;
      }
      if (username.length > 20) {
        toast.error("Потребителското име трябва да е най-много 20 символа");
        return;
      }
      try {
        const response = await instance.put("/users/" + userData.sub, {
          username: username,
        });
        toast.success("Готово, промени потребителското си име");
      } catch (error) {
        if (error.response.status === 409) {
          toast.error("Потребителското име вече е заето");
        } else {
          toast.error(
            "Неуспешна промяна на потребителско име. Пробвай отново по-късно."
          );
        }
      }
    },
    async changeEmail() {
      if (!email.includes("@")) {
        toast.error("Невалиден имейл");
        return;
      }
      try {
        const response = await instance.put("/users/" + userData.sub, {
          email: email,
        });
        toast.success("Готово, промени имейла си");
      } catch (error) {
        if (error.response.status === 409) {
          toast.error("Имейлът вече е зает");
        } else {
          toast.error("Неуспешна промяна на имейл. Пробвай отново по-късно.");
        }
      }
    },
    async changePassword() {
      if (newPassword.length < 8) {
        toast.error("Паролата трябва да е поне 8 символа");
        return;
      }
      if (newPassword !== newPassword2) {
        toast.error("Паролите не съвпадат");
        return;
      }
      try {
        const response = await instance.put("/users/" + userData.sub, {
          password: newPassword,
          new_password: newPassword,
        });
      } catch (error) {
        toast.error("Неуспешна промяна на парола. Пробвай отново по-късно");
      }
    },
    async deleteAccount() {
      if (
        confirm(
          "Сигурен ли си, че искаш да изтриеш профила си? Няма връщане назад"
        ) === false
      )
        return;
      try {
        const response = await instance.delete("/users/" + userData.sub);
        console.log(response);
        localStorage.removeItem("token");
        //  window.location.href = "/";
      } catch (error) {
        console.log(error);
        toast.error("Неуспешно изтриване на профил. Пробвай отново по-късно");
      }
    },
  };
  Object.freeze(SettingsFunctions);
  return (
    <Dashboard>
      <ToastContainer />
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
                type="text"
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
                type="text"
                placeholder="Въведи сегашната парола"
              />
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                type="text"
                placeholder="Въведи новата парола"
              />
              <input
                onChange={(e) => setNewPassword2(e.target.value)}
                type="text"
                placeholder="Повтори новата парола"
              />
              <button onClick={() => SettingsFunctions.changePassword()}>
                Промени
              </button>
            </div>
            <li>Експортирай всички данни</li>
            <div>
              <p>Експортирай всички данни, които ЗапомниГо има за теб</p>
              <button>Експортирай</button>
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
