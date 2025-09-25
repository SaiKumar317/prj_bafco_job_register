SELECT 
distinct h.sVoucherNo documentNo,
convert (nvarchar, dbo.IntToDate(h.iDate),103) AS docDate,
ISNULL(ca.sName, '') AS customerAcc,
ISNULL(ca.sCode, '') AS customerCode,
ISNULL(sm.sName, '') AS salesMan,
ISNULL(sm.sCode, '') AS salesManCode,
ISNULL(gt.sName, '') AS cargoDescription,
ISNULL(p.sCode, '') AS serviceId,
ISNULL(eb.Description, '') AS description,
ISNULL(abs(ind.fQuantity), 0) AS fQuantity,
ISNULL(ind.mRate, 0) mRate,
ISNULL(ct.sName, '') AS containerType,
ISNULL(ind.mGross, 0) AS mGross,
ISNULL(bsd.[VAT Amount], '') AS taxAmount,
ISNULL(h.fNet,0) AS finalInvoice,
ISNULL(t.iTag3008, 0) AS jobId,
ISNULL(j.sName, '') AS jobName,
ISNULL(j.sCode, '') AS jobCode,
ISNULL(cu.sCode, '') AS currency,
CASE WHEN (select iValue as iBaseCurrencyId from cCore_PreferenceVal_0 With(Readuncommitted) where iCategory=4 and iFieldId=10) =cu.iCurrencyId then 1 
else ISNULL(df.fExchangeRate,0) end fExchangeRate,
ISNULL(bsd.VAT,0) taxPer,
d.iBodyId
FROM tCore_Header_0 h
JOIN tCore_HeaderData3332_0 eh ON eh.iHeaderId = h.iHeaderId
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 ind on ind.iBodyId = d.iBodyId
LEFT JOIN tCore_Data3332_0 eb ON eb.iBodyId = d.iBodyId
JOIN vCore_BodyScreenData_0 bsd on bsd.iBodyId = d.iBodyId
LEFT JOIN tCore_Data_Tags_0 t ON t.iBodyId = d.iBodyId
LEFT JOIN tCore_Data_FX_0 df ON df.iBodyId = d.iBodyId
LEFT JOIN mCore_Product p ON p.iMasterId = ind.iProduct
LEFT JOIN mCore_joborder j ON j.iMasterId = t.iTag3008
LEFT JOIN mCore_Account ca on ca.iMasterId = d.iBookNo
LEFT JOIN mCore_salesman sm on sm.iMasterId = t.iTag3010
LEFT JOIN mCore_goodstype gt on gt.iMasterId = t.iTag3015
LEFT JOIN mCore_containertype ct on ct.iMasterId = t.iTag3019
LEFT JOIN mCore_Currency cu on cu.iCurrencyId = d.iCurrencyId
WHERE h.iVoucherType IN (3332)--Tax Invoice
and d.iMainBodyId = 0 and t.iTag3008 = 4 and  h.iDate = dbo.dateToInt('2025-04-25') and h.sVoucherNo = ''

	
--SELECT      c.name  AS 'ColumnName'
--            ,t.name AS 'TableName'
--FROM        sys.columns c
--JOIN        sys.tables  t   ON c.object_id = t.object_id
--WHERE       c.name LIKE '%curre%'
--ORDER BY    TableName ,ColumnName;

--select * from tCore_Company_Details

--select iValue as iBaseCurrencyId from cCore_PreferenceVal_0 With(Readuncommitted) where iCategory=4 and iFieldId=10
