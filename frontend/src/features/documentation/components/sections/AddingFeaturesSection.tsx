/**
 * Adding New Features Section
 */
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Card, Alert, Chip } from '@components/wrappers';
import { CodeBlock } from '@features/showcase/components';

export const AddingFeaturesSection: React.FC = () => (
    <Box>
        <Typography variant="h4" gutterBottom>
            Adding New Features
        </Typography>

        <Alert severity="success" sx={{ mb: 3 }}>
            Follow this step-by-step guide to add new features to the application maintaining consistency and best practices.
        </Alert>

        <Card title="Feature Development Checklist" sx={{ mb: 3 }}>
            <List>
                <ListItem>
                    <Chip label="1" color="primary" size="small" sx={{ mr: 2 }} />
                    <ListItemText
                        primary="Phase 1: Planning"
                        secondary="Define requirements, design data models, plan API endpoints"
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <Chip label="2" color="primary" size="small" sx={{ mr: 2 }} />
                    <ListItemText
                        primary="Phase 2: Setup"
                        secondary="Create folder structure, define TypeScript interfaces, add translations"
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <Chip label="3" color="primary" size="small" sx={{ mr: 2 }} />
                    <ListItemText
                        primary="Phase 3: Implementation"
                        secondary="Create service layer, implement hooks, build components"
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <Chip label="4" color="primary" size="small" sx={{ mr: 2 }} />
                    <ListItemText
                        primary="Phase 4: Testing"
                        secondary="Test functionality, error scenarios, responsive design"
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <Chip label="5" color="primary" size="small" sx={{ mr: 2 }} />
                    <ListItemText
                        primary="Phase 5: Documentation"
                        secondary="Add code comments, update docs, document API usage"
                    />
                </ListItem>
            </List>
        </Card>

        <Card title="Step 1: Create Feature Folder Structure" sx={{ mb: 3 }}>
            <CodeBlock
                language="bash"
                code={`src/features/products/
├── components/
│   └── ProductCard/
│       ├── ProductCard.tsx
│       ├── ProductCard.types.ts
│       └── index.ts
├── hooks/
│   └── useProducts.ts
├── services/
│   └── product.service.ts
├── types/
│   └── product.types.ts
└── pages/
    ├── Products.tsx
    └── ProductDetail.tsx`}
            />
        </Card>

        <Card title="Step 2: Define Types" sx={{ mb: 3 }}>
            <CodeBlock
                language="tsx"
                code={`// src/features/products/types/product.types.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  category: string;
}`}
            />
        </Card>

        <Card title="Step 3: Create Service" sx={{ mb: 3 }}>
            <CodeBlock
                language="tsx"
                code={`// src/features/products/services/product.service.ts
import { BaseService } from '@services/base.service';
import { Product } from '../types/product.types';

class ProductService extends BaseService<Product> {
  constructor() {
    super('/products');
  }

  async getByCategory(category: string): Promise<Product[]> {
    const response = await axiosInstance.get(
      \`\${this.endpoint}/category/\${category}\`
    );
    return response.data.data;
  }
}

export const productService = new ProductService();`}
            />
        </Card>

        <Card title="Step 4: Create Custom Hook" sx={{ mb: 3 }}>
            <CodeBlock
                language="tsx"
                code={`// src/features/products/hooks/useProducts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '../services/product.service';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getAll(),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data) => productService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};`}
            />
        </Card>

        <Card title="Step 5: Add Route">
            <CodeBlock
                language="tsx"
                code={`// Update src/routes/AppRoutes.tsx
const Products = lazy(() => import('@features/products/pages/Products'));

// Add route
<Route path="/products" element={<Products />} />`}
            />
        </Card>
    </Box>
);
