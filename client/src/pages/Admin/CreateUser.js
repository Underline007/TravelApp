// CreateUser.jsx
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Form, Input, Button, Select, Row, Col } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";

const { Option } = Select;

const CreateUser = () => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            const response = await axios.post("/api/v1/auth/register", values);
            const { success, message, user } = response.data;

            if (success) {
                toast.success(message);
                form.resetFields();
            } else {
                toast.error(message);
            }
        } catch (error) {
            console.error("Error creating user:", error);
            toast.error("Error creating user");
        }
    };

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <Row gutter={16}>
                    <Col span={6}>
                        <AdminMenu />
                    </Col>
                    <Col span={18}>
                        <h1 className="text-center">Create New User</h1>
                        <Form
                            form={form}
                            name="createUserForm"
                            onFinish={onFinish}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: "Please enter the name" }]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Enter name" />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: "Please enter the email" },
                                    { type: "email", message: "Please enter a valid email" },
                                ]}
                            >
                                <Input prefix={<MailOutlined />} placeholder="Enter email" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[{ required: true, message: "Please enter the password" }]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="Enter password" />
                            </Form.Item>

                            <Form.Item
                                name="answer"
                                label="Security Answer"
                                rules={[{ required: true, message: "Please enter the security answer" }]}
                            >
                                <Input placeholder="Enter security answer" />
                            </Form.Item>

                            <Form.Item
                                name="role"
                                label="Role"
                                rules={[{ required: true, message: "Please select the role" }]}
                            >
                                <Select placeholder="Select role">
                                    <Option value={0}>User</Option>
                                    <Option value={1}>Admin</Option>
                                    <Option value={2}>Tour Guide</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Create User
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        </Layout>
    );
};

export default CreateUser;
