--select * from cCore_Vouchers_0 where sName like '%job c%'

--Job Charges 7939

SELECT 
distinct h.sVoucherNo documentNo,
convert (nvarchar, dbo.IntToDate(h.iDate),103) AS docDate,
ISNULL(eh.JobChargesId, '') jobChargesId,
ISNULL(cc.iMasterId, 0) chargeCategoryId,
ISNULL(cc.sCode, '') AS chargeCategoryCode,
ISNULL(cc.sName, 0) chargeCategoryName,
ISNULL(ind.mGross, 0) AS mGross,
ISNULL(eh.ApprovedAmount, 0) AS approvedAmount,
ISNULL(eh.ApprovedByID, 0) AS approvedByID,
convert (nvarchar, dbo.IntToDate(ISNULL(eh.ApprovedDate, 0)),103) AS approvedDate,
ISNULL(eh.SfOrderItemNumber, 0) AS sfOrderItemNumber,
CASE WHEN ISNULL(eh.InActive, 0) = 0 then 'False' 
when ISNULL(eh.InActive, 0) = 1 then 'True' end AS inActive,
ISNULL(eh.UpdatedByUserId, 0) AS updatedByUserId,
convert (nvarchar, dbo.IntToDate(ISNULL(eh.DateUpdated, 0)),103) AS dateUpdated,
ISNULL(eb.sRemarks, 0) AS sRemarks,
CASE WHEN ISNULL(eh.IsApprovedRequired, 0) = 0 then 'False' 
when ISNULL(eh.IsApprovedRequired, 0) = 1 then 'True' end AS isApprovedRequired,
ISNULL(eh.ApprovedRemarks, 0) AS approvedRemarks,
ISNULL(eh.ApprovedBy, 0) AS approvedBy,
ISNULL(eh.UpdatedBy_, 0) AS updatedBy,
ISNULL(cu.sCode, '') AS currency,
ISNULL(eh.ApprovedCurrencyID, '') AS approvedCurrencyID,
ISNULL(eh.Billto, 0) AS billTo,
ISNULL(eh.ApprovalStatus, 0) AS approvalStatus,
CASE WHEN ISNULL(eh.IsFreightInvoice, 0) = 0 then 'False' 
when ISNULL(eh.IsFreightInvoice, 0) = 1 then 'True' end   AS isFreightInvoice,
ISNULL(eh.DocumentPath, 0) AS documentPath,
ISNULL(eh.SfOrderNumber, 0) AS sfOrderNumber,
ISNULL(t.iTag3008, 0) AS jobId,
ISNULL(j.sName, '') AS jobName,
ISNULL(j.sCode, '') AS jobCode,
d.iBodyId
FROM tCore_Header_0 h
JOIN tCore_HeaderData7939_0 eh ON eh.iHeaderId = h.iHeaderId
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 ind on ind.iBodyId = d.iBodyId
LEFT JOIN tCore_Data7939_0 eb ON eb.iBodyId = d.iBodyId
LEFT JOIN tCore_Data_Tags_0 t ON t.iBodyId = d.iBodyId
LEFT JOIN mCore_joborder j ON j.iMasterId = t.iTag3008
LEFT JOIN mCore_chargecategory cc ON cc.iMasterId = t.iTag3028
LEFT JOIN mCore_Currency cu on cu.iCurrencyId = d.iCurrencyId
WHERE h.iVoucherType IN (7939) --Job Charges
and d.iMainBodyId = 0 --and t.iTag3008 = 4 and  h.iDate = dbo.dateToInt('2025-04-25') 

--select * from cCore_MasterDef where sMasterName like '%char%'

--chargecategory 3028

SELECT      c.name  AS 'ColumnName'
            ,t.name AS 'TableName'
FROM        sys.columns c
JOIN        sys.tables  t   ON c.object_id = t.object_id
WHERE       c.name LIKE '%delivery%'
ORDER BY    TableName ,ColumnName;

