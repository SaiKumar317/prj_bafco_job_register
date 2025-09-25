--select * from cCore_Vouchers_0 where sName like '%job d%' 
--Job Documents 5642



SELECT 
distinct h.sVoucherNo documentNo,
convert (nvarchar, dbo.IntToDate(h.iDate),103) AS docDate,
ISNULL(eb.AttachedId, '') AS attachedId,
ISNULL(eb.FileName, '') AS fileName,
ISNULL(eb.PathName, '') AS pathName,
ISNULL(eb.AttachmentTypeName, '') AS attachmentTypeName,

ISNULL(t.iTag3008, 0) AS jobId,
ISNULL(j.sName, '') AS jobName,
ISNULL(j.sCode, '') AS jobCode,
d.iBodyId
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 ind on ind.iBodyId = d.iBodyId
LEFT JOIN tCore_Data5642_0 eb ON eb.iBodyId = d.iBodyId
LEFT JOIN tCore_Data_Tags_0 t ON t.iBodyId = d.iBodyId
LEFT JOIN mCore_joborder j ON j.iMasterId = t.iTag3008
WHERE h.iVoucherType IN (5642)--Job Order Charges
and d.iMainBodyId = 0 --and t.iTag3008 = 4 and  h.iDate = dbo.dateToInt('2025-04-25') 
