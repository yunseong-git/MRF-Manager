<template>
    <div>
      <h1 @click="goHome">MRFDB</h1>
      <img src="/path/to/your/image.jpg" alt="이미지" />
      <button @click="showLogin">로그인</button>
      <button @click="showRegister">회원가입</button>
  
      <div v-if="showLoginForm">
        <input v-model="militaryId" placeholder="군번" />
        <input v-model="password" placeholder="패스워드" type="password" />
        <label>
          <input type="checkbox" v-model="isAdmin" /> 관리자
        </label>
        <button @click="login">로그인</button>
      </div>
  
      <div v-if="showRegisterForm">
        <input v-model="militaryId" placeholder="군번" />
        <input v-model="name" placeholder="이름" />
        <input v-model="birthDate" placeholder="생년월일" />
        <input v-model="password" placeholder="패스워드" type="password" />
        <button @click="register">회원가입</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        militaryId: '',
        password: '',
        name: '',
        birthDate: '',
        isAdmin: false,
        showLoginForm: false,
        showRegisterForm: false,
      };
    },
    methods: {
      goHome() {
        this.$router.push('/');
      },
      showLogin() {
        this.showLoginForm = true;
        this.showRegisterForm = false;
      },
      showRegister() {
        this.showLoginForm = false;
        this.showRegisterForm = true;
      },
      async login() {
        try {
          const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              militaryId: this.militaryId,
              password: this.password,
              isAdmin: this.isAdmin,
            }),
          });
  
          const data = await response.json();
          if (response.ok) {
            alert(data.message);
            this.$router.push('/test1');
          } else {
            alert(data.message);
          }
        } catch (error) {
          alert('로그인 오류: ' + error.message);
        }
      },
      async register() {
        try {
          const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              militaryId: this.militaryId,
              name: this.name,
              birthDate: this.birthDate,
              password: this.password,
            }),
          });
  
          const data = await response.json();
          if (response.ok) {
            alert(data.message);
            this.showRegisterForm = false;
          } else {
            alert(data.message);
          }
        } catch (error) {
          alert('회원가입 오류: ' + error.message);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  h1 {
    text-align: center;
    cursor: pointer;
  }
  </style>