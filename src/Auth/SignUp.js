// import React, { Component } from 'react'
// import { Form, Icon, Input, Button, Checkbox } from 'antd';
// import '../Assets/style.css'
// import storage from 'local-storage'
// import Axios from 'axios'
// import { Redirect } from 'react-router-dom'

// class SignUp extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       id: null,
//       username:'',
//       email:'',
//       password: ''
//     }
//   }

//   setUsername(e) {
//     let value = e.target.value
//     this.setState({username: value})
//   }

//   setEmail(e) {
//     let value = e.target.value
//     this.setState({email: value})
//   }
//   setPassword(e) {
//     let value = e.target.value
//     this.setState({password: value})
//   }
  
//   // getFieldDecorator(data){
//   //   return new Promise((resolve, reject) => {
//   //     Axios.post('http://localhost:3500/api/v1/users/register', data)
//   //     .then((res) => {
//   //       storage.set('token', res.data.token)
//   //       console.log(storage.get.token)

//   //       resolve()
//   //       window.location.href = '/'
//   //     }).catch((err) => {
//   //       console.log(err.response.data.message)
//   //       alert(err.response.data.message)
//   //     })
//   //   })
//   // }
//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.form.validateFields((err, values) => {
//       if (!err) {
//         console.log('Received values of form: ', values);
//       }
//     });
//   };

//   render() {
//     const { getFieldDecorator } = this.props.form;
//     return (
//       <Form onSubmit={this.handleSubmit} className="login-form">
//         <Form.Item>
//           {/* {getFieldDecorator('username', {
//             rules: [{ required: true, message: 'Please input your username!' }],
//           } */}
//           )(
//             <Input
//               prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
//               placeholder="Username"
//             />,
//           )}
//         </Form.Item>
//         <Form.Item>
//           {/* {getFieldDecorator('password', {
//             rules: [{ required: true, message: 'Please input your Password!' }],
//           } */}
          
//           )(
//             <Input
//               prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
//               type="password"
//               placeholder="Password"
//             />,
//           )}
//         </Form.Item>
//         <Form.Item>
//           {/* {getFieldDecorator('remember', {
//             valuePropName: 'checked',
//             initialValue: true,
//           } */}
          
//           )(<Checkbox>Remember me</Checkbox>)}
//           <a className="login-form-forgot" href="">
//             Forgot password
//           </a>
//           <Button type="primary" htmlType="submit" className="login-form-button">
//             Log in
//           </Button>
//           Or <a href="">register now!</a>
//         </Form.Item>
//       </Form>
//     );
//   }
// }

// export default SignUp