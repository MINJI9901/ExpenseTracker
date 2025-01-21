import { Card, Typography } from "@mui/material";

export default function BudgetBox({ subCategoryData }) {
    return (
        <Card size="sm" variant="plain" sx={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center', border: '1px solid', marginBottom: '0.7rem', padding: '0 0.5rem' }}>
            <Typography sx={{lineHeight: '2.5rem', maxWidth: '50%', overflowX: 'auto', textWrap: 'nowrap'}}>
                {subCategoryData.name}
            </Typography>
            <Typography sx={{lineHeight: '2.5rem', maxWidth: '40%', overflowX: 'auto', textWrap: 'nowrap'}}>
                $ {subCategoryData.budget.toLocaleString("en", { 'minimumFractionDigits':2, 'maximumFractionDigits':2 })}
            </Typography>
        </Card>
    )
}