import React, {useState} from 'react';
import {Menu, MenuProps} from "antd";
import {AreaChartOutlined, ClockCircleOutlined, MailOutlined} from "@ant-design/icons";

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

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key as string);
    }

    const items: MenuItem[] = [
        getItem('Navigation 1', 'nav1', <MailOutlined/>, [
            getItem('Option 1', 'nav1op1'),
            getItem('Option 2', 'nav1op2'),
        ]),
        getItem('Navigation 2', 'nav2', <ClockCircleOutlined/>, [
            getItem('Option 1', 'nav2op1'),
            getItem('Option 2', 'nav2op2'),
        ]),
        getItem('Navigation 3', 'nav3', <AreaChartOutlined/>, [
            getItem('Option 1', 'nav3op1'),
            getItem('Option 2', 'nav3op2'),
        ]),
    ];

    return (
        <div>
            <Menu
                theme="dark"
                className={"navMenu"}
                onClick={onClick}
                defaultOpenKeys={['sub1']}
                selectedKeys={[current]}
                mode="inline"
                items={items}
                inlineCollapsed={false}
                disabledOverflow={true}
            />
        </div>
    );
};

export default SideMenu;