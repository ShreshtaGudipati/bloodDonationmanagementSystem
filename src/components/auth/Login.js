import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox
} from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const { login, googleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showBloodGroupDialog, setShowBloodGroupDialog] = useState(false);
  const [bloodGroup, setBloodGroup] = useState('');
  const [isDonor, setIsDonor] = useState(true);
  const [googleCredential, setGoogleCredential] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to log in');
      if (err.response?.data?.useGoogle) {
        setError('This account uses Google login. Please sign in with Google.');
      }
    }

    setLoading(false);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const result = await googleLogin(credentialResponse.credential);
      if (result.needsAdditionalInfo) {
        setGoogleCredential(credentialResponse.credential);
        setShowBloodGroupDialog(true);
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to log in with Google');
    }
  };

  const handleGoogleFailure = () => {
    setError('Google sign in was unsuccessful. Please try again.');
  };

  const handleBloodGroupSubmit = async () => {
    if (!bloodGroup) {
      setError('Please select your blood group');
      return;
    }

    try {
      await googleLogin(googleCredential, { bloodGroup, isDonor });
      setShowBloodGroupDialog(false);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to complete registration');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Sign In
          </Button>

          <Divider sx={{ my: 2 }}>OR</Divider>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              useOneTap
            />
          </Box>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Don't have an account?{' '}
              <Button
                onClick={() => navigate('/register')}
                color="primary"
                sx={{ textTransform: 'none' }}
              >
                Sign Up
              </Button>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Dialog open={showBloodGroupDialog} onClose={() => setShowBloodGroupDialog(false)}>
        <DialogTitle>Complete Your Profile</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Please provide your blood group to complete registration
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Blood Group</InputLabel>
            <Select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              label="Blood Group"
            >
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
                <MenuItem key={group} value={group}>{group}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={isDonor}
                onChange={(e) => setIsDonor(e.target.checked)}
              />
            }
            label="I want to be a donor"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowBloodGroupDialog(false)}>Cancel</Button>
          <Button onClick={handleBloodGroupSubmit} variant="contained">
            Complete Registration
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Login;
