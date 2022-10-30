import React, { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiHomeSmile, BiHash } from 'react-icons/bi';
import { BsPerson } from 'react-icons/bs';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { Button, Box, Text, Flex, Image, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

import logo from './logo.svg';
import { Login } from './Login';
import { ModalTryitar } from './ModalTryitar';
import { IUser } from './Profile';

type Props = {
  user: IUser,
  setUser: Dispatch<SetStateAction<IUser>>
}

export const Nav = ({ user, setUser }: any) => {
  const style = {
    flexIcons: {
      fontSize: '1.4rem',
      gap: '10px',
      alignItems: 'center',
      w: '80%',
      _hover: { bg: '#0000000d' },
      padding: '10px 5px',
      borderRadius: '20px'
    },
    icon: {
      fontSize: '1.8rem'
    }
  };

  const navigate = useNavigate();
  const checkout = () => {
    setUser();
    localStorage.removeItem('user');
    navigate('/explorer');
  };
  // const token = localStorage.getItem('token');

  return (
    <Flex minW="20vw" maxW="20vw" flex="0.5" gap="20px" flexDirection="column" borderRight="1px" borderColor="gray.700">

      <Box width="100%" padding="10px 10px 0" >
        <Box width="1.9rem">
          <Image src={logo} color="red" />
        </Box>
      </Box>

      <Flex as="nav" flexDirection="column" gap="1rem" paddingLeft="10px">
        {user ? (
          <>
            <Flex cursor="pointer" {...style.flexIcons} onClick={() => navigate('/')}>
              <BiHomeSmile {...style.icon} />
              <Text>Página Inicial</Text>
            </Flex>

            <Flex cursor="pointer" {...style.flexIcons} onClick={() => navigate('/explorer')}>
              <BiHash {...style.icon} />
              <Text>Explorar</Text>
            </Flex>

            <Flex cursor="pointer" {...style.flexIcons} onClick={() => navigate(`/profile/${user.arroba}`)}>
              <BsPerson {...style.icon} />
              <Text>Perfil</Text>
            </Flex>
          </>
        )
          : (
            <>
              <Flex cursor="pointer" {...style.flexIcons}  >
                <BiHash {...style.icon} />
                <Text>Explorar</Text>
              </Flex>
              <Login setUser={setUser} />
            </>
          )}
      </Flex>

      {user && (
        <>
          <ModalTryitar />
          <Menu>
            <Box textAlign="right" marginRight="13px" _hover={{ bg: '#0000000d' }} transition=".15s all " borderRadius="30px" p="5px 0">
              <MenuButton
                display="flex"
                width="100%"

                justifyContent="space-around"
                bg="none"
              >
                <Flex alignItems="center" justifyContent="space-around" w="100%" >
                  <Flex flexDirection="column" gap="1px" alignItems="flex-start">
                    <Text>{user.name}</Text>
                    <Text color="gray.500" fontWeight="100">@{user.arroba}</Text>
                  </Flex>

                  <Box >
                    <AiOutlineEllipsis fontSize="1.5rem" />
                  </Box>
                </Flex>

              </MenuButton>
              <MenuList>
                <MenuItem onClick={checkout}>Sair de {user.email}</MenuItem>
              </MenuList>
            </Box>
          </Menu>
        </>
      )
      }

    </Flex >
  );
};
