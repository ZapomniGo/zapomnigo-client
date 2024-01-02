
const VerifyEmail = () => {
  return (
    <div className="verify">
        <div className="verifyContainer">
                    <h1>Потвърдете имейла си</h1>
                    <p>Проверете имейла си, би трябвало да сте получили имейл от нас. Проверете и спам папката. Ако все пак не сте получили, натиснете бутона отдолу</p>
                    <input type="text" placeholder="Имейл" />
            <button className="button">Изпрати отново</button>
            </div>
    </div>
  )
}

export default VerifyEmail