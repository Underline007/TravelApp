import React, { useState, useEffect } from "react";
import { Table, Space, Button, Modal, message } from "antd";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const UserList = () => {
    const [users, setUsers] = useState([]);


    const getAllUsers = async () => {
        try {
            const { data } = await axios.get("/api/v1/auth/users");
            setUsers(data.users);
        } catch (error) {
            console.log(error);
            message.error("Something Went Wrong");
        }
    };


    const deleteUserHandler = async (userId) => {
        try {
            await axios.delete(`/api/v1/auth/users/${userId}`);
            message.success("User deleted successfully");
            getAllUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            message.error("Error deleting user");
        }
    };


    const showDeleteConfirm = (userId) => {
        confirm({
            title: 'Confirm Delete',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to delete this user?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteUserHandler(userId);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => {
                switch (role) {
                    case 0:
                        return "User";
                    case 1:
                        return "Admin";
                    case 2:
                        return "Tour Guide";
                    default:
                        return "Unknown Role";
                }
            },
            filters: [
                { text: 'User', value: 0 },
                { text: 'Admin', value: 1 },
                { text: 'Tour Guide', value: 2 },
            ],
            onFilter: (value, record) => record.role === value,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button
                        type="danger"
                        onClick={() => showDeleteConfirm(record._id)}
                        style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    // Custom row className based on index for alternating row colors
    const getRowClassName = (record, index) => {
        return index % 2 === 0 ? 'even-row' : 'odd-row';
    };

    // Lifecycle method
    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center">All Users List</h1>
                        <Table
                            dataSource={users}
                            columns={columns}
                            rowKey="_id"
                            pagination={{ pageSize: 10 }}
                            rowClassName={getRowClassName}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UserList;
