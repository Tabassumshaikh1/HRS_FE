import LocalGasStationTwoToneIcon from "@mui/icons-material/LocalGasStationTwoTone";
import MoneyOffTwoToneIcon from "@mui/icons-material/MoneyOffTwoTone";
import PriceChangeTwoToneIcon from "@mui/icons-material/PriceChangeTwoTone";
import RequestQuoteTwoToneIcon from "@mui/icons-material/RequestQuoteTwoTone";
import Grid from "@mui/material/Grid";
import { SparkLineChart } from "@mui/x-charts";
import { DailyExpenseCardColors } from "../../../data/color.constant";
import { IDailyExpenseAnalytics } from "../../../interfaces/daily-expense.interface";
import Currency from "../../../shared/components/Common/Currency";
import GridItem from "../../../shared/components/Styled/GridItem";
import { UtilService } from "../../../services/util.service";
import { AppDefaults } from "../../../data/app.constant";

interface IProps {
  dailyExpenseAnalytics: IDailyExpenseAnalytics;
}

const DailyExpenseDashboardCards = ({ dailyExpenseAnalytics }: IProps) => {
  const utilSvc = new UtilService();
  const { expenseOnFuel, challan, otherExpenses, total } = dailyExpenseAnalytics.cardsData;
  const {
    expenseOnFuel: fuelChartData,
    challan: challanChartData,
    otherExpenses: otherExpensesChartData,
    total: totalChartData,
  } = dailyExpenseAnalytics.cardsChartData;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GridItem style={{ backgroundColor: DailyExpenseCardColors.expenseOnFuel }} className="analytics-card">
            <div className="row analytics-card-content">
              <div className="col-8 analytics-card-data">
                <h3>
                  <Currency value={expenseOnFuel} />
                </h3>
                <h6>Expense On Fuel</h6>
              </div>
              <div className="col-4 analytics-card-icon">
                <LocalGasStationTwoToneIcon fontSize="large" color="inherit" />
              </div>
            </div>
            <div className="row pb-3">
              <div className="col-12">
                <SparkLineChart
                  data={fuelChartData}
                  colors={["white"]}
                  height={30}
                  showTooltip
                  showHighlight
                  valueFormatter={(value) => `${AppDefaults.RUPEE_SYMBOL}${utilSvc.calculateValueFromPercentage(value, expenseOnFuel)}`}
                />
              </div>
            </div>
          </GridItem>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GridItem style={{ backgroundColor: DailyExpenseCardColors.challan }} className="analytics-card">
            <div className="row analytics-card-content">
              <div className="col-8 analytics-card-data">
                <h3>
                  <Currency value={challan} />
                </h3>
                <h6>Challan</h6>
              </div>
              <div className="col-4 analytics-card-icon">
                <MoneyOffTwoToneIcon fontSize="large" color="inherit" />
              </div>
            </div>
            <div className="row pb-3">
              <div className="col-12">
                <SparkLineChart
                  data={challanChartData}
                  colors={["white"]}
                  height={30}
                  showTooltip
                  showHighlight
                  valueFormatter={(value) => `${AppDefaults.RUPEE_SYMBOL}${utilSvc.calculateValueFromPercentage(value, challan)}`}
                />
              </div>
            </div>
          </GridItem>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GridItem style={{ backgroundColor: DailyExpenseCardColors.otherExpenses }} className="analytics-card">
            <div className="row analytics-card-content">
              <div className="col-8 analytics-card-data">
                <h3>
                  <Currency value={otherExpenses} />
                </h3>
                <h6>Other Expenses</h6>
              </div>
              <div className="col-4 analytics-card-icon">
                <RequestQuoteTwoToneIcon fontSize="large" color="inherit" />
              </div>
            </div>
            <div className="row pb-3">
              <div className="col-12">
                <SparkLineChart
                  data={otherExpensesChartData}
                  colors={["white"]}
                  height={30}
                  showTooltip
                  showHighlight
                  valueFormatter={(value) => `${AppDefaults.RUPEE_SYMBOL}${utilSvc.calculateValueFromPercentage(value, otherExpenses)}`}
                />
              </div>
            </div>
          </GridItem>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GridItem style={{ backgroundColor: DailyExpenseCardColors.total }} className="analytics-card">
            <div className="row analytics-card-content">
              <div className="col-8 analytics-card-data">
                <h3>
                  <Currency value={total} />
                </h3>
                <h6>Total Expenses</h6>
              </div>
              <div className="col-4 analytics-card-icon">
                <PriceChangeTwoToneIcon fontSize="large" color="inherit" />
              </div>
            </div>
            <div className="row pb-3">
              <div className="col-12">
                <SparkLineChart
                  data={totalChartData}
                  colors={["white"]}
                  height={30}
                  showTooltip
                  showHighlight
                  valueFormatter={(value) => `${AppDefaults.RUPEE_SYMBOL}${utilSvc.calculateValueFromPercentage(value, total)}`}
                />
              </div>
            </div>
          </GridItem>
        </Grid>
      </Grid>
    </>
  );
};

export default DailyExpenseDashboardCards;
