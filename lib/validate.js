//login validation
export default function login_validate(values){
  const errors={};

  if (!values.email) {
     errors.email = 'Required, Please valid email';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
     errors.email = 'Invalid email address';
   }
   //password validation
   if (values.password === null) {
      errors.password = 'Pasword is Required';
    } else if (values.password.length < 8 || values.password.length > 20) {
      errors.password = 'Invalid Password, Must be greater then 8 & less then 20 characters long';
    }else if (values.password.includes(' ')) {
      errors.password="Invalid Password";
    }
    return errors;

}
//register validation
export function registerValidate(values){
  const errors={};

//username validation
  if(!values.username){
    errors.username="Required"
  }else if (values.username.includes(' ')) {
    errors.username="Invalid User name"
  }
  //email validation
  if (!values.email) {
     errors.email = 'Required, Please valid email';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
     errors.email = 'Invalid email address';
   }
   //password validation
   if (values.password === null) {
      errors.password = 'Pasword is Required';
    } else if (values.password.length < 8 || values.password.length > 20) {
      errors.password = 'Invalid Password, Must be greater then 8 & less then 20 characters long';
    }else if (values.password.includes(' ')) {
      errors.password="Invalid Password";
    }

    if (!values.cpassword) {
       errors.cpassword = 'Pasword is Required';
     }else if (values.password !== values.cpassword) {
       errors.cpassword = 'Pasword does not match...!';
     }else if (values.cpassword.includes(' ')) {
       error.cpassword="Invalid Password"
     }
     return errors;
}
