/**
 * API Integration Section
 */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Card, Alert } from '@components/wrappers';
import { CodeBlock } from '@features/showcase/components';
import { useTheme } from '@mui/material/styles';

export const ApiIntegrationSection: React.FC = () => {
    const theme = useTheme();

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                API Integration
            </Typography>

            <Alert severity="info" sx={{ mb: 3 }}>
                All API calls go through a centralized service layer with Axios interceptors for consistent error handling.
            </Alert>

            <Card title="Service Layer Architecture" sx={{ mb: 3 }}>
                <Box
                    sx={{
                        p: 2,
                        bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
                        borderRadius: 1,
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                        overflow: 'auto',
                    }}
                >
                    <pre style={{ margin: 0 }}>
                        {`Component/Hook
    ↓
Feature Service (authService.login())
    ↓
Base Service (CRUD operations)
    ↓
Axios Instance (with interceptors)
    ↓
Backend API`}
                    </pre>
                </Box>
            </Card>

            <Card title="Base Service Class" sx={{ mb: 3 }}>
                <CodeBlock
                    language="tsx"
                    code={`export class BaseService<T> {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getAll(params?: QueryParams): Promise<PaginatedResponse<T>> {
    const response = await axiosInstance.get(this.endpoint, { params });
    return response.data.data;
  }

  async getById(id: string | number): Promise<T> {
    const response = await axiosInstance.get(\`\${this.endpoint}/\${id}\`);
    return response.data.data;
  }

  async create(data: Partial<T>): Promise<T> {
    const response = await axiosInstance.post(this.endpoint, data);
    return response.data.data;
  }

  async update(id: string | number, data: Partial<T>): Promise<T> {
    const response = await axiosInstance.put(\`\${this.endpoint}/\${id}\`, data);
    return response.data.data;
  }

  async delete(id: string | number): Promise<void> {
    await axiosInstance.delete(\`\${this.endpoint}/\${id}\`);
  }
}`}
                />
            </Card>

            <Card title="Axios Configuration" sx={{ mb: 3 }}>
                <CodeBlock
                    language="tsx"
                    code={`export const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor - Add auth token
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  });

  // Response interceptor - Handle errors
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        // Handle token refresh
      }
      return Promise.reject(error);
    }
  );

  return instance;
};`}
                />
            </Card>

            <Card title="API Response Format">
                <CodeBlock
                    language="tsx"
                    code={`interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  statusCode: number;
}

// Example response
{
  "data": {
    "user": { ... },
    "accessToken": "...",
    "refreshToken": "..."
  },
  "message": "Login successful",
  "success": true,
  "statusCode": 200
}`}
                />
            </Card>
        </Box>
    );
};
