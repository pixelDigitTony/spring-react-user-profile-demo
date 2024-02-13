import React, {useState} from 'react';
import {Button, Menu, MenuProps} from "antd";
import {
    AreaChartOutlined,
    ClockCircleOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const SideMenu = () => {

    const [current, setCurrent] = useState('1');
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key as string);
        if (e.key === 'adminAccess1') {
            navigate('adminAccess1', {replace: true});
        }
        if (e.key === 'adminAccess2') {
            navigate('adminAccess2', {replace: true});
        }
        if (e.key === 'officerAccess1') {
            navigate('officerAccess1', {replace: true});
        }
        if (e.key === 'officerAccess2') {
            navigate('officerAccess2', {replace: true});
        }
        if (e.key === 'guestAccess1') {
            navigate('guestAccess1', {replace: true});
        }
        if (e.key === 'guestAccess2') {
            navigate('guestAccess2', {replace: true});
        }
    }

    const onClick2 = () => {
        toggleCollapsed();
    }

    const items: MenuItem[] = [
        getItem('Admin', 'nav1', <MailOutlined/>, [
            getItem('Access 1', 'adminAccess1'),
            getItem('Access 2', 'adminAccess2'),
        ]),
        getItem('Officer', 'nav2', <ClockCircleOutlined/>, [
            getItem('Access 1', 'officerAccess1'),
            getItem('Access 2', 'officerAccess2'),
        ]),
        getItem('Guest', 'nav3', <AreaChartOutlined/>, [
            getItem('Access 1', 'guestAccess1'),
            getItem('Access 2', 'guestAccess2'),
        ])
    ];

    return (
        <div className={'sideBar'}>
            <Menu
                theme="dark"
                onClick={onClick}
                selectedKeys={[current]}
                mode="inline"
                items={items}
                inlineCollapsed={collapsed}
                disabledOverflow={true}
                style={{
                    flex: "auto",
                    flexDirection: "column",
                    height: "95%",
                    position: "relative",
                    overflow: "visible"
                }}
            />
            <Button
                className={"collapseButton"}
                onClick={onClick2}
                icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                style={{width: "100%", height: '5%'}}
            />
        </div>
    );
};

export default SideMenu;