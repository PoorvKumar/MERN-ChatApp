import { ViewIcon } from '@chakra-ui/icons';
import { Avatar, Button,  IconButton,  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';

const ProfileModal=({user,children})=>
{
    const { isOpen, onOpen,onClose }=useDisclosure();
    const history=useHistory();

    const logOutHandler=()=>
    {
        localStorage.removeItem("userInfo");
        history.push("/");
    }

    return <>
    
        {children?<span onClick={onOpen}>{children}</span>:<IconButton display="flex" icon={<ViewIcon/>}></IconButton>}
        {/* {children?<span onClick={onOpen}>{children}</span>:<Avatar src={user.imageURL} name={user.name} boxSize="2.1rem" size="2rem" />} */}

        <Modal isOpen={isOpen} onClose={onClose} size={{base:"xs" ,md: "md"}}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader display="flex" justifyContent="center">
                Profile
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Avatar name={user.name} src={user.imageURL} boxSize="6.8rem" marginX="9.2rem"/>
                <Text align="center" fontWeight="bold" fontSize="large" marginTop="1.5rem">{user.name}</Text>
                <Text align="center" fontWeight="medium" fontStyle="italic" marginBottom="1rem">{user.email}</Text>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='cyan' marginEnd="9.5rem" onClick={onClose} color="white" onClickCapture={logOutHandler}>
                    LogOut
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>

    </>;
}

export default ProfileModal;