const {By,Key,Builder} = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const http = require('http');
let fs = require('fs');
let path = require('path');

const base = 'http://192.168.178.38';
const language = 'en';
const src = [
    'legal/privacy',
    'legal/terms',
    'legal/imprint',
    'forgot',
    'admin/module/settings',
    'admin/account/list',
    'admin/account/settings',
    'admin/account/create',
    'admin/group/list',
    'admin/group/settings',
    'admin/group/create',
    'admin/module/list',
    'admin/module/info',
    'admin/module/log',
    'admin/module/route/list',
    'admin/module/hook/list',
    'admin/audit/list',
    'admin/audit/view',
    'admin/audit/view?id=1',
    'admin/audit/view?id=9999',
    'organization/organigram',
    'organization/unit/list',
    'organization/unit/view',
    'organization/unit/view?id=1',
    'organization/unit/view?id=9999',
    'organization/unit/create',
    'organization/department/list',
    'organization/department/view',
    'organization/department/view?id=1',
    'organization/department/view?id=9999',
    'organization/department/create',
    'organization/position/list',
    'organization/position/view',
    'organization/position/view?id=1',
    'organization/position/view?id=9999',
    'organization/position/create',
    'help/general',
    'help/module/list',
    'help/module/view',
    'help/module/view?id=1',
    'help/module/view?id=9999',
    'help/developer',
    'tag/create',
    'tag/list',
    'tag/view',
    'tag/view?id=1',
    'tag/view?id=9999',
    'admin/module/settings?id=Media',
    'media/list',
    'media/upload',
    'media/file/create',
    'media/collection/create',
    'media/view',
    'media/view?id=1',
    'media/view?id=9999',
    'profile/list',
    'profile/view',
    'profile/view?id=1',
    'profile/view?id=9999',
    'admin/module/settings/view/create',
    'admin/module/settings?id=Navigation',
    'admin/module/navigation/list',
    'cms/application/list',
    'cms/application/page/list',
    'cms/application/page',
    'cms/application/post/list',
    'cms/application/files',
    'cms/application/create',
    'admin/monitoring/general',
    'admin/monitoring/stats',
    'admin/monitoring/log/list',
    'admin/monitoring/log/view',
    'admin/monitoring/log/view?id=1',
    'admin/monitoring/log/view?id=9999',
    'helper/template/create',
    'helper/report/create',
    'helper/list',
    'helper/report/view',
    'helper/report/view?id=1',
    'helper/report/view?id=9999',
    'search',
    'calendar/dashboard',
    'editor/create',
    'editor/list',
    'editor/view',
    'editor/view?id=1',
    'editor/view?id=9999',
    'editor/edit',
    'notification/dashboard',
    'task/dashboard',
    'task/list',
    'task/view',
    'task/view?id=1',
    'task/view?id=9999',
    'task/create',
    'task/analysis',
    'messages/dashboard',
    'messages/template/list',
    'messages/template/view',
    'messages/template/view?id=1',
    'messages/template/view?id=9999',
    'checklist/list',
    'checklist/view',
    'checklist/view?id=1',
    'checklist/view?id=9999',
    'checklist/template/list',
    'checklist/template/create',
    'checklist/template/view',
    'checklist/template/view?id=1',
    'checklist/template/view?id=9999',
    'checklist/template/task/view',
    'checklist/template/task/view?id=1',
    'checklist/template/task/view?id=9999',
    'checklist/template/task/create',
    'news/dashboard',
    'news/article',
    'news/archive',
    'news/draft/list',
    'news/create',
    'news/edit',
    'kanban',
    'kanban/dashboard',
    'kanban/archive',
    'kanban/board',
    'kanban/card/view',
    'kanban/card/view?id=1',
    'kanban/card/view?id=9999',
    'kanban/card/create',
    'kanban/create',
    'kanban/edit',
    'admin/module/settings?id=QA',
    'qa/dashboard',
    'qa/question/view',
    'qa/question/view?id=1',
    'qa/question/view?id=9999',
    'qa/question/create',
    'qa/app/list',
    'qa/app/view',
    'qa/app/view?id=1',
    'qa/app/view?id=9999',
    'qa/app/create',
    'workflow/template/list',
    'workflow/template/view',
    'workflow/template/view?id=1',
    'workflow/template/view?id=9999',
    'workflow/template/create',
    'workflow/instance/list',
    'workflow/instance/view',
    'workflow/instance/view?id=1',
    'workflow/instance/view?id=9999',
    'humanresource/staff/list',
    'humanresource/staff/view',
    'humanresource/staff/view?id=1',
    'humanresource/staff/view?id=9999',
    'humanresource/staff/create',
    'humanresource/department/list',
    'humanresource/department/view',
    'humanresource/department/view?id=1',
    'humanresource/department/view?id=9999',
    'humanresource/position/list',
    'humanresource/position/view',
    'humanresource/position/view?id=1',
    'humanresource/position/view?id=9999',
    'humanresource/timerecording/dashboard',
    'private/timerecording/dashboard',
    'private/timerecording/session',
    'contract/list',
    'contract/view',
    'contract/view?id=1',
    'contract/view?id=9999',
    'contract/create',
    'contract/type/list',
    'contract/type/view',
    'contract/type/view?id=1',
    'contract/type/view?id=9999',
    'contract/type/create',
    'contract/attribute/type/list',
    'contract/attribute/type/view',
    'contract/attribute/type/view?id=1',
    'contract/attribute/type/view?id=9999',
    'contract/attribute/type/create',
    'contract/attribute/value/view',
    'contract/attribute/value/view?id=1',
    'contract/attribute/value/view?id=9999',
    'contract/attribute/value/create',
    'support/list',
    'support/ticket/view',
    'support/ticket/view?id=1',
    'support/ticket/view?id=9999',
    'support/create',
    'support/analysis/dashboard',
    'support/settings',
    'sales/client/attribute/type/list',
    'sales/client/attribute/type/view',
    'sales/client/attribute/type/view?id=1',
    'sales/client/attribute/type/view?id=9999',
    'sales/client/attribute/type/create',
    'sales/client/attribute/value/view',
    'sales/client/attribute/value/view?id=1',
    'sales/client/attribute/value/view?id=9999',
    'sales/client/attribute/value/create',
    'sales/client/list',
    'sales/client/create',
    'sales/client/view',
    'sales/client/view?id=1',
    'sales/client/view?id=9999',
    'sales/client/analysis',
    'accounting/entry/dashboard',
    'accounting/entry/list',
    'accounting/entry/view',
    'accounting/entry/view?id=1',
    'accounting/entry/view?id=9999',
    'accounting/entry/create',
    'accounting/entry/archive',
    'accounting/entry/template/list',
    'accounting/coa/view',
    'accounting/coa/view?id=1',
    'accounting/coa/view?id=9999',
    'accounting/coa/list',
    'accounting/coa/create',
    'accounting/costcenter/list',
    'accounting/costobject/list',
    'accounting/costcenter/view',
    'accounting/costcenter/view?id=1',
    'accounting/costcenter/view?id=9999',
    'accounting/costcenter/create',
    'accounting/costobject/view',
    'accounting/costobject/view?id=1',
    'accounting/costobject/view?id=9999',
    'accounting/costobject/create',
    'accounting/supplier/list',
    'accounting/client/list',
    'accounting/supplier/view',
    'accounting/supplier/view?id=1',
    'accounting/supplier/view?id=9999',
    'accounting/client/view',
    'accounting/client/view?id=1',
    'accounting/client/view?id=9999',
    'item/attribute/type/list',
    'item/attribute/type/view',
    'item/attribute/type/view?id=1',
    'item/attribute/type/view?id=9999',
    'item/attribute/type/create',
    'item/attribute/value/view',
    'item/attribute/value/view?id=1',
    'item/attribute/value/view?id=9999',
    'item/attribute/value/create',
    'item/list',
    'item/create',
    'item/view',
    'item/view?id=1',
    'item/view?id=9999',
    'sales/item/list',
    'sales/item/view',
    'sales/item/view?id=1',
    'sales/item/view?id=9999',
    'purchase/item/list',
    'purchase/item/view',
    'purchase/item/view?id=1',
    'purchase/item/view?id=9999',
    'warehouse/item/list',
    'warehouse/item/view',
    'warehouse/item/view?id=1',
    'warehouse/item/view?id=9999',
    'purchase/analysis/item',
    'production/item/list',
    'production/item/view',
    'production/item/view?id=1',
    'production/item/view?id=9999',
    'item/material/list',
    'item/material/view',
    'item/material/view?id=1',
    'item/material/view?id=9999',
    'item/material/create',
    'purchase/supplier/attribute/type/list',
    'purchase/supplier/attribute/type/view',
    'purchase/supplier/attribute/type/view?id=1',
    'purchase/supplier/attribute/type/view?id=9999',
    'purchase/supplier/attribute/type/create',
    'purchase/supplier/attribute/value/view',
    'purchase/supplier/attribute/value/view?id=1',
    'purchase/supplier/attribute/value/view?id=9999',
    'purchase/supplier/attribute/value/create',
    'purchase/supplier/list',
    'purchase/supplier/create',
    'purchase/supplier/view',
    'purchase/supplier/view?id=1',
    'purchase/supplier/view?id=9999',
    'purchase/analysis/supplier',
    'finance/tax/code/list',
    'finance/tax/code/view',
    'finance/tax/code/view?id=1',
    'finance/tax/code/view?id=9999',
    'finance/tax/code/create',
    'sales/bill/create',
    'sales/bill/list',
    'sales/bill/archive',
    'sales/bill/view',
    'sales/bill/view?id=1',
    'sales/bill/view?id=9999',
    'purchase/bill/create',
    'purchase/bill/list',
    'purchase/bill/archive',
    'purchase/bill/view',
    'purchase/bill/view?id=1',
    'purchase/bill/view?id=9999',
    'purchase/bill/upload',
    'warehouse/bill/create',
    'warehouse/bill/list',
    'warehouse/bill/archive',
    'warehouse/bill/view',
    'warehouse/bill/view?id=1',
    'warehouse/bill/view?id=9999',
    'private/purchase/recognition/dashboard',
    'private/purchase/recognition/upload',
    'private/purchase/recognition/bill',
    'purchase/recognition/dashboard',
    'purchase/recognition/upload',
    'purchase/recognition/bill',
    'bill/payment/list',
    'bill/payment/view',
    'bill/payment/view?id=1',
    'bill/payment/view?id=9999',
    'bill/shipping/list',
    'bill/shipping/view',
    'bill/shipping/view?id=1',
    'bill/shipping/view?id=9999',
    'finance/tax/combination/list',
    'finance/tax/combination/view',
    'finance/tax/combination/view?id=1',
    'finance/tax/combination/view?id=9999',
    'finance/tax/combination/create',
    'purchase/order/suggestion/view',
    'purchase/order/suggestion/view?id=1',
    'purchase/order/suggestion/view?id=9999',
    'purchase/order/suggestion/create',
    'purchase/order/suggestion/list',
    'sales/analysis',
    'sales/analysis/bill',
    'sales/analysis/rep',
    'sales/analysis/region',
    'sales/analysis/client',
    'sales/analysis/item',
    'warehouse/stock/list',
    'warehouse/stock/view',
    'warehouse/stock/view?id=1',
    'warehouse/stock/view?id=9999',
    'warehouse/stock/create',
    'warehouse/stock/type/list',
    'warehouse/stock/type/view',
    'warehouse/stock/type/view?id=1',
    'warehouse/stock/type/view?id=9999',
    'warehouse/stock/type/create',
    'warehouse/stock/location/list',
    'warehouse/stock/location/view',
    'warehouse/stock/location/view?id=1',
    'warehouse/stock/location/view?id=9999',
    'warehouse/stock/location/create',
    'qualitymanagement/report/list',
    'qualitymanagement/report/view',
    'qualitymanagement/report/view?id=1',
    'qualitymanagement/report/view?id=9999',
    'qualitymanagement/report/create',
    'qualitymanagement/audit/list',
    'qualitymanagement/audit/view',
    'qualitymanagement/audit/view?id=1',
    'qualitymanagement/audit/view?id=9999',
    'equipment/attribute/type/list',
    'equipment/attribute/type/view',
    'equipment/attribute/type/view?id=1',
    'equipment/attribute/type/view?id=9999',
    'equipment/attribute/type/create',
    'equipment/attribute/value/view',
    'equipment/attribute/value/view?id=1',
    'equipment/attribute/value/view?id=9999',
    'equipment/attribute/value/create',
    'equipment/list',
    'equipment/create',
    'equipment/view',
    'equipment/view?id=1',
    'equipment/view?id=9999',
    'equipment/inspection/list',
    'equipment/inspection/type/list',
    'equipment/inspection/create',
    'equipment/inspection/view',
    'equipment/inspection/view?id=1',
    'equipment/inspection/view?id=9999',
    'accounting/asset/attribute/type/list',
    'accounting/asset/attribute/type/view',
    'accounting/asset/attribute/type/view?id=1',
    'accounting/asset/attribute/type/view?id=9999',
    'accounting/asset/list',
    'accounting/asset/view',
    'accounting/asset/view?id=1',
    'accounting/asset/view?id=9999',
    'accounting/asset/create',
    'accounting/asset/table',
    'fleet/vehicle/attribute/type/list',
    'fleet/vehicle/attribute/type/view',
    'fleet/vehicle/attribute/type/view?id=1',
    'fleet/vehicle/attribute/type/view?id=9999',
    'fleet/vehicle/attribute/type/create',
    'fleet/vehicle/attribute/value/view',
    'fleet/vehicle/attribute/value/view?id=1',
    'fleet/vehicle/attribute/value/view?id=9999',
    'fleet/vehicle/attribute/value/create',
    'fleet/vehicle/list',
    'fleet/vehicle/create',
    'fleet/vehicle/view',
    'fleet/vehicle/view?id=1',
    'fleet/vehicle/view?id=9999',
    'fleet/driver/attribute/type/list',
    'fleet/driver/attribute/type/view',
    'fleet/driver/attribute/type/view?id=1',
    'fleet/driver/attribute/type/view?id=9999',
    'fleet/driver/attribute/type/create',
    'fleet/driver/attribute/value/view',
    'fleet/driver/attribute/value/view?id=1',
    'fleet/driver/attribute/value/view?id=9999',
    'fleet/driver/attribute/value/create',
    'fleet/driver/list',
    'fleet/driver/create',
    'fleet/driver/view',
    'fleet/driver/view?id=1',
    'fleet/driver/view?id=9999',
    'fleet/inspection/list',
    'fleet/inspection/vehicle/type/list',
    'fleet/inspection/vehicle/create',
    'fleet/inspection/vehicle/view',
    'fleet/inspection/vehicle/view?id=1',
    'fleet/inspection/vehicle/view?id=9999',
    'fleet/inspection/driver/type/list',
    'fleet/inspection/driver/create',
    'fleet/inspection/driver/view',
    'fleet/inspection/driver/view?id=1',
    'fleet/inspection/driver/view?id=9999',
    'wiki',
    'wiki/dashboard',
    'wiki/category/list',
    'wiki/category/view',
    'wiki/category/view?id=1',
    'wiki/category/view?id=9999',
    'wiki/category/create',
    'wiki/doc/view',
    'wiki/doc/view?id=1',
    'wiki/doc/view?id=9999',
    'wiki/doc/create',
    'wiki/doc/edit',
    'wiki/doc/list',
    'wiki/app/list',
    'wiki/app/view',
    'wiki/app/view?id=1',
    'wiki/app/view?id=9999',
    'wiki/app/create',
    'admin/exchange/import/list',
    'admin/exchange/export/list',
    'admin/exchange/import/view',
    'admin/exchange/import/view?id=1',
    'admin/exchange/import/view?id=9999',
    'admin/exchange/export/view',
    'admin/exchange/export/view?id=1',
    'admin/exchange/export/view?id=9999',
    'admin/exchange/log/list',
    'admin/exchange/log',
    'finance/investment/list',
    'finance/investment/view',
    'finance/investment/view?id=1',
    'finance/investment/view?id=9999',
    'finance/investment/option/create',
    'finance/investment/option/view',
    'finance/investment/option/view?id=1',
    'finance/investment/option/view?id=9999',
    'finance/investment/create',
    'private/investment/list',
    'private/investment/create',
    'private/investment/view',
    'private/investment/view?id=1',
    'private/investment/view?id=9999',
    'finance/loan/list',
    'finance/loan/view',
    'finance/loan/view?id=1',
    'finance/loan/view?id=9999',
    'finance/loan/create',
    'finance/loan/table',
    'businessexpenses/expense/list',
    'businessexpenses/expense/create',
    'businessexpenses/expense/view',
    'businessexpenses/expense/view?id=1',
    'businessexpenses/expense/view?id=9999',
    'businessexpenses/expense/element/view',
    'businessexpenses/expense/element/view?id=1',
    'businessexpenses/expense/element/view?id=9999',
    'businessexpenses/expense/element/create',
    'businessexpenses/type/list',
    'businessexpenses/type/view',
    'businessexpenses/type/view?id=1',
    'businessexpenses/type/view?id=9999',
    'businessexpenses/type/create',
    'controlling/balance/dashboard',
    'controlling/pl/dashboard',
    'controlling/budget/dashboard',
    'controlling/budget/pl',
    'controlling/budget/balance',
    'controlling/budget/sales',
    'controlling/budget/material',
    'controlling/budget/opex',
    'controlling/budget/hr',
    'controlling/budget/investment',
    'controlling/budget/loan',
    'controlling/budget/cashflow',
    'controlling/budget/profitcenter',
    'controlling/budget/projects',
    'controlling/budget/marketing',
    'controlling/budget/event',
    'controlling/budget/leasing',
    'warehouse/stocktaking/list',
    'warehouse/stocktaking/overview',
    'warehouse/stocktaking/area',
    'warehouse/stocktaking/entry',
    'warehouse/stocktaking/stats',
    'warehouse/labeling/item/list',
    'warehouse/labeling/item',
    'warehouse/labeling/layout',
    'warehouse/labeling/layout/list',
    'production/list',
    'production/create',
    'production/view',
    'production/view?id=1',
    'production/view?id=9999',
    'production/machine/list',
    'production/machine/create',
    'production/machine/view',
    'production/machine/view?id=1',
    'production/machine/view?id=9999',
    'production/recipe/list',
    'production/recipe/create',
    'production/recipe/view',
    'production/recipe/view?id=1',
    'production/recipe/view?id=9999',
    'orw/resource/list',
    'orw/resource',
    'orw/resource/create',
    'orw/resource/report/list',
    'orw/resource/report',
    'projectmanagement/list',
    'projectmanagement/create',
    'projectmanagement/view',
    'projectmanagement/view?id=1',
    'projectmanagement/view?id=9999',
    'eventmanagement/list',
    'eventmanagement/create',
    'eventmanagement/view',
    'eventmanagement/view?id=1',
    'eventmanagement/view?id=9999',
    'controlling/riskmanagement/cockpit',
    'controlling/riskmanagement/risk/list',
    'controlling/riskmanagement/risk/create',
    'controlling/riskmanagement/risk/view',
    'controlling/riskmanagement/risk/view?id=1',
    'controlling/riskmanagement/risk/view?id=9999',
    'controlling/riskmanagement/cause/list',
    'controlling/riskmanagement/cause/view',
    'controlling/riskmanagement/cause/view?id=1',
    'controlling/riskmanagement/cause/view?id=9999',
    'controlling/riskmanagement/solution/list',
    'controlling/riskmanagement/solution/view',
    'controlling/riskmanagement/solution/view?id=1',
    'controlling/riskmanagement/solution/view?id=9999',
    'controlling/riskmanagement/department/list',
    'controlling/riskmanagement/department/view',
    'controlling/riskmanagement/department/view?id=1',
    'controlling/riskmanagement/department/view?id=9999',
    'controlling/riskmanagement/category/list',
    'controlling/riskmanagement/category/view',
    'controlling/riskmanagement/category/view?id=1',
    'controlling/riskmanagement/category/view?id=9999',
    'controlling/riskmanagement/category/create',
    'controlling/riskmanagement/project/list',
    'controlling/riskmanagement/project/view',
    'controlling/riskmanagement/project/view?id=1',
    'controlling/riskmanagement/project/view?id=9999',
    'controlling/riskmanagement/process/list',
    'controlling/riskmanagement/process/view',
    'controlling/riskmanagement/process/view?id=1',
    'controlling/riskmanagement/process/view?id=9999',
    'controlling/riskmanagement/process/create',
    'controlling/riskmanagement/settings/dashboard',
];
const length = src.length;

async function checkEndpoint(driver, url) {
    await driver.get(url);

    try {
        await driver.findElement(By.xpath('//*[@alt="404 error image"]'));

        return -1;
    } catch(error) {
        return 0;
    } finally {
    	const data = await driver.takeScreenshot(true);
    	await fs.writeFileSync('C:/Users/spl1nes/screenshots/' + url.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.png', data, 'base64');
    }
}

let dir = path.dirname('C:/Users/spl1nes/screenshots/');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

(async function loop() {
    const driver = await new Builder().forBrowser("chrome").build();
    await driver.get(base);
    await driver.manage().setTimeouts({ implicit: 3000 });
    await driver.manage().window().setRect({ width: 1920, height: 1080 });
    await driver.findElement(By.id('iLoginButton')).click();
    await driver.sleep(1000);

    let status = 0;

    for (let i = 0; i < length; ++i) {
        try {
            status = await checkEndpoint(driver, base + '/' + language + '/' + src[i]);
        } catch(error) {
            console.error(error);
        }

        if (status !== 0) {
            console.error(status +': ' + src[i]);
            status = 0;
        }
    }

    await driver.quit();
})();
