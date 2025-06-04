import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDeE7aEfbz5eIAHYeAYkyhuVGRhdDcHo3s",
    authDomain: "innovity-c493e.firebaseapp.com",
    databaseURL: "https://innovity-c493e-default-rtdb.firebaseio.com",
    projectId: "innovity-c493e",
    storageBucket: "innovity-c493e.firebasestorage.app",
    messagingSenderId: "468348927406",
    appId: "1:468348927406:web:80fdadea91ca2a787c1c3f",
    measurementId: "G-GFC24N6Q9C"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const el = {
  register          : null,
  lastname          : null,
  name              : null,
  email             : null,
  phone             : null,
  status            : null,
  payment           : null,
  close             : null,
  success           : null
};

const selector = {
  register          : '#register',
  lastname          : '#lastname',
  name              : '#name',
  email             : '#email',
  phone             : '#phone',
  status            : '#student-type',
  payment           : '#payment-type',
  close             : '.close',
  success           : '#success'
};

const handler = {
    clickOnRegister: (e) => {
        e.preventDefault();
        const lastname = el.lastname.value;
        const name = el.name.value;
        const email = el.email.value;
        const phone = el.phone.value;
        const status = el.status.value;
        const payment = el.payment.value;

        

        const dbRef = ref(db);

        get(child(dbRef, `register/${phone}`)).then((snapshot) => {
            if (snapshot.exists()) {
                alert("phone number is already registered");
            } else {
                set(ref(db, `register/${phone}`), {
                    lastname: lastname,
                    name: name,
                    phone: phone,
                    status: status,
                    email: email,
                });

                el.success.style.display = 'block';
            }
        });
        
    },
    onClickClose: () => {
        if (el.success.style.display) {
            el.success.style.display = 'none';
        }
    }
};

const setProperty = () => {
  el.register = document.querySelector(selector.register);

  el.lastname = document.querySelector(selector.lastname);
  el.name = document.querySelector(selector.name);
  el.phone = document.querySelector(selector.phone);
  el.email = document.querySelector(selector.email);
  el.status = document.querySelector(selector.status);
  el.payment = document.querySelector(selector.payment);
  el.close = document.querySelector(selector.close);
  el.success = document.querySelector(selector.success);
}

const bind = () => {
    if (el.register) {
        el.register.addEventListener('submit', handler.clickOnRegister);
    }

    if (el.close) {
        el.close.addEventListener('click', handler.onClickClose);
    }
}

const contentReady = () => {
  setProperty();
  bind();
}


const checkState = () => {
  return document.readyState === 'complete'
}


let loader = null;
'loading' === document.readyState
? loader = setInterval(() => {
  checkState() ? (clearInterval(loader), contentReady()) : null;
}, 100) : contentReady();