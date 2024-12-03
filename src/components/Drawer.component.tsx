import { Button, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerHeaderTitle } from '@fluentui/react-components';
import { Children, useContext, useEffect, useRef, useState } from 'react';
import { Dismiss24Regular } from "@fluentui/react-icons";
import { IDrawer } from '../interfaces/IDrawer';
import { title } from 'process';

const DrawerComponent = (
    {
        isOpen = false,
        setIsOpen,
        type = "overlay",
        appearance = "subtle",
        size = "medium",
        title = "Title",
        position = "start",
        children,
        isvisibleButtomCancel = true,
        isvisibleButtomPrimary = true,
        TitleButtomCancel = "Cancel",
        TitleButtomPrimary = "Add",
        appearanceButtomCancel = "outline",
        appearanceButtomPrimary = "primary",
        onClickButtomCancel,
        onClickButtomPrimary
    }: IDrawer) => {

    return (
        <Drawer
            type={type}
            separator
            open={isOpen}
            size={size}
            position={position}
        >
            <DrawerHeader>
                <DrawerHeaderTitle
                    action={
                        <Button
                            appearance="subtle"
                            aria-label="Close"
                            icon={<Dismiss24Regular />}
                            onClick={() => setIsOpen(false)}
                        />
                    }
                >
                    {title}
                </DrawerHeaderTitle>
            </DrawerHeader>

            <DrawerBody>
                {children}
            </DrawerBody>

            <DrawerFooter className=' d-flex justify-content-between'>
                <div>
                    {
                        isvisibleButtomCancel && (
                            <Button appearance={appearanceButtomCancel} onClick={onClickButtomCancel} >{TitleButtomCancel}</Button>
                        )
                    }
                </div>
                <div>
                    {
                        isvisibleButtomPrimary && (
                            <Button type='submit' appearance={appearanceButtomPrimary} onClick={onClickButtomPrimary} >{TitleButtomPrimary}</Button>
                        )
                    }
                </div>
            </DrawerFooter>
        </Drawer>
    );
}

export {
    DrawerComponent
};