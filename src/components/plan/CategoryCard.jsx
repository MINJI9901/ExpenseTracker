import { Box, Container, Grid2, Typography, Button, Card, Chip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import BudgetBox from "./BudgetBox";

export default function CategoryCard({ categoryData }) {
    const budgetPerCategory = categoryData.sub_category.reduce((prev, curr) => prev + parseFloat(curr.budget), 0)

    return (
        // <Container sx={{bgcolor: 'white', width: '20rem'}}>dsfdsfds</Container>
        <Grid2 size={4} minWidth='18rem'>
            <Card
                size="sm"
                variant="plain"
                sx={{ textAlign: 'center', lineHeight: '2.5rem', minHeight: '2.5rem' }}
            >
                {categoryData.category}
            </Card>
            <Box sx={{ bgcolor: 'white', borderRadius: '1.5rem', height: '22rem', marginTop: '1rem', padding: '1rem' }}>
                <Box sx={{ overflow: 'auto', height: '15rem', marginBottom: '0.5rem' }}>
                    <Chip
                        label='Sub-category | Budget'
                        sx={{ display: 'block', position: 'sticky', top: '0', borderRadius: '0', bgcolor: 'white', color: '#A0A0A0', textAlign: 'center' }} 
                    />
                    {categoryData.sub_category.map(subCate => (
                        <BudgetBox key={subCate._id} subCategoryData={subCate} />
                    ))}
                </Box>
                <Box sx={{ position: 'sticky', margin: 'auto' }}>
                    <Card
                        size="sm"
                        variant="plain"
                        sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: 'beige', textAlign: 'center', marginBottom: '0.2rem', padding: '0 0.5rem' }}
                    >
                        <Typography sx={{lineHeight: '2.5rem', maxWidth: '50%', overflowX: 'auto', textWrap: 'nowrap'}}>
                            Budget
                        </Typography>
                        <Typography sx={{lineHeight: '2.5rem', maxWidth: '40%', overflowX: 'auto', textWrap: 'nowrap'}}>
                            $ {budgetPerCategory.toLocaleString("en", { 'minimumFractionDigits':2, 'maximumFractionDigits':2 })}
                        </Typography>
                    </Card>
                    <Button sx={{ bgcolor: '#C0C0C0', width: '100%' }}>
                        <AddIcon size='sm'></AddIcon>
                        Add New Specific
                    </Button>
                </Box>
            </Box>
        </Grid2>
    )
}