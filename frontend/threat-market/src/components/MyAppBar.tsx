'use client'

import { uploadFile } from '@/lib/api';
import { getEthAccountFromCookie, requestAccounts, sellIoc } from '@/lib/eth';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Checkbox, FormControlLabel, FormGroup, InputAdornment, Modal, TextField } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const [IsModalOpen, setIsModalOpen] = useState(false)
  const [EthAccount, setEthAccount] = useState<string | null>(null)
  useEffect(() => {
    setEthAccount(getEthAccountFromCookie());
  }, [])

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ backgroundColor: "black" }} position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Threat Intelligence Marketplace
            </Typography>
            <Stack direction={'row'} spacing={2} alignItems={'center'}>
              {EthAccount === null && <Button color="inherit" variant='contained' onClick={() => requestAccounts()}>
                <Typography color='primary'>Connect</Typography>
              </Button>}
              {EthAccount !== null && <Typography color='inherit' >{EthAccount}</Typography>}
              <Button color="primary" variant='contained' onClick={SubmitSell}>
                <Typography>Sell</Typography>
              </Button>
            </Stack>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      <SellModal open={IsModalOpen} handleClose={() => { setIsModalOpen(false) }} account={EthAccount} />
    </>
  );
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface SellModalProps {
  open: boolean;
  handleClose: () => void;
  account: string | null
}

function SubmitSell(){
  sellIoc();
}

function SellModal({ open, handleClose, account }: SellModalProps) {
  const [IsMalware, setIsMalware] = useState(false);
  const [IsVerified, setIsVerified] = useState(false);
  const [Price, setPrice] = useState(0);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack spacing={2}>
          <Typography variant="h5" component="div">
            Publish Threat Intelligence Information
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>By {account}</Typography>
          <Button
            fullWidth
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => uploadFile(`localhost:3001`, event.target.files.item(0))}
            />
          </Button>
          <FormGroup row>
            <FormControlLabel control={<Checkbox color='error' value={IsMalware} onChange={(event, checked) => setIsMalware(checked)}/>} label="Is this malware?" />
            <FormControlLabel control={<Checkbox color='success'value={IsVerified} onChange={(event, checked) => setIsVerified(checked)}/>} label="Is this verified?" />
          </FormGroup>
          <TextField label="Price" variant="outlined" type='number' fullWidth value={Price} onChange={(event) => setPrice(parseFloat(event.target.value))} slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  ETH
                </InputAdornment>
              ),
            },
          }} />
          <div>
            <Button size="large" color="inherit" variant='contained' fullWidth onClick={SubmitSell}>
              <Typography color='textPrimary'>Sell</Typography>
            </Button>
          </div>
        </Stack>
      </Box>
    </Modal>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'darkgrey',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
