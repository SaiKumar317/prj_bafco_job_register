--select * from cCore_Vouchers_0 where sName like '%job o%'

--Job Order Charges 2568

SELECT 
distinct h.sVoucherNo documentNo,
convert (nvarchar, dbo.IntToDate(h.iDate),103) AS docDate,
ISNULL(eh.JobOrderChargesId, 0) AS jobOrderChargesId,
ISNULL(ct.sName, '') AS newChargeTypeName,
ISNULL(ind.mGross, 0) AS amount,
ISNULL(ctu.ChargeTypeId, 0) AS ChargeTypeId,
ISNULL(abs(ind.fQuantity), 0) AS fQuantity,
ISNULL(ind.mRate, 0) AS unitPrice,
ISNULL(bsd.Taxable, 0) AS priceExclVat,
ISNULL(bsd.VAT, 0) AS vat,
ISNULL(bsd.[VAT Amount], 0) AS vatAmount,
ISNULL(h.fNet, 0) AS totalIncludingVAT,
CASE WHEN ISNULL(eh.InActive, 0) = 0 then 'False' 
when ISNULL(eh.InActive, 0) = 1 then 'True' end AS inActive,
ISNULL(eh.UpdatedByUserId, 0) AS updatedByUserId,
convert (nvarchar, dbo.IntToDate(ISNULL(eh.DateUpdated, 0)),103) AS dateUpdated,
ISNULL(cu.iCurrencyId, 0) AS iCurrencyId,
ISNULL(cu.sCode, '') AS currency,
ISNULL(eh.UpdatedbyUserName, '') AS updatedbyUserName,
ISNULL(bsd.[Buying rate], 0) AS buyingRate,
ISNULL(eh.CodeName, '') AS codeName,
ISNULL(ctu.NewChargeTypeId, 0) AS newChargeTypeId,
ISNULL(ct.sCode, '') AS newChargeTypeCode,
ISNULL(p.sName, '') AS item,
ISNULL(tc.sName, '') AS taxCode,
ISNULL(t.iTag3008, 0) AS jobId,
ISNULL(j.sName, '') AS jobName,
ISNULL(j.sCode, '') AS jobCode,
d.iBodyId
FROM tCore_Header_0 h
JOIN tCore_HeaderData2568_0 eh ON eh.iHeaderId = h.iHeaderId
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 ind on ind.iBodyId = d.iBodyId
JOIN vCore_BodyScreenData_0 bsd on bsd.iBodyId = d.iBodyId
LEFT JOIN mCore_Product p on p.iMasterId = ind.iProduct
LEFT JOIN tCore_Data2568_0 eb ON eb.iBodyId = d.iBodyId
LEFT JOIN tCore_Data_Tags_0 t ON t.iBodyId = d.iBodyId
LEFT JOIN mCore_joborder j ON j.iMasterId = t.iTag3008
LEFT JOIN mCore_newchargetype ct ON ct.iMasterId = t.iTag3036
LEFT JOIN muCore_newchargetype ctu ON ctu.iMasterId = t.iTag3036
LEFT JOIN mCore_TaxCode tc ON tc.iMasterId = eb.TaxCode
LEFT JOIN mCore_chargecategory cc ON cc.iMasterId = t.iTag3028
LEFT JOIN mCore_Currency cu on cu.iCurrencyId = d.iCurrencyId
WHERE h.iVoucherType IN (2568)--Job Order Charges
and d.iMainBodyId = 0 --and t.iTag3008 = 4 and  h.iDate = dbo.dateToInt('2025-04-25') 

--select * from cCore_MasterDef where sMasterName like '%tax%'

--chargecategory 3028


select iMasterId jobID, sName jobName, sCode jobCode
from mCore_joborder where iMasterId <> 0 and iStatus <> 5 and sCode in () 


select iMasterId accId, sName accName, sCode accCode
from mCore_Account where iMasterId <> 0 and iStatus <> 5 and sCode in () 