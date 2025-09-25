select distinct jobId, costLocked from EX_JobRegLockedCost where jobId in (1)
  --drop table [EX_JobRegLockedCost]


  select * from cCore_Vouchers_0 where sName like '%tax%'
  --Tax Invoice 3332

  select distinct h.sVoucherNo label,h.iHeaderId value
  from tCore_Header_0 h
  where h.iVoucherType = 3332

   SELECT 
   distinct h.sVoucherNo documentNo,
    convert (nvarchar, dbo.IntToDate(h.iDate),103) AS docDate,
    ISNULL(t.iTag3008, 0) AS jobId,
    ISNULL(j.sName, '') AS jobName,
    ISNULL(j.sCode, '') AS jobCode,
	
	case when tc.sCode = 'ZR' then ind.mRate else 0 end zeroTaxCost,
	case when tc.sCode = 'SR-REC' then ind.mRate else 0 end taxCost,
    ISNULL(ca.sName, '') AS vendorAcc,
	 ISNULL(pa.sName, '') AS purchaseAcc,
	ISNULL(bsd.[VAT Amount], '') AS taxAmount,
	ISNULL(h.fNet,0) AS totalCost,
	'' AS eirId,
	'' AS challan,
	ISNULL(eh.ContainerNo, '') AS containerNo,
	ISNULL(eb.sRemarks, '') AS sRemarks,
  d.iBodyId
FROM tCore_Header_0 h
JOIN tCore_HeaderData3332_0 eh ON eh.iHeaderId = h.iHeaderId
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 ind on ind.iBodyId = d.iBodyId
LEFT JOIN tCore_Data3332_0 eb ON eb.iBodyId = d.iBodyId
JOIN vCore_BodyScreenData_0 bsd on bsd.iBodyId = d.iBodyId
LEFT JOIN tCore_Data_Tags_0 t ON t.iBodyId = d.iBodyId
LEFT JOIN mCore_joborder j ON j.iMasterId = t.iTag3008
LEFT JOIN mCore_branch br ON br.iMasterId = t.iTag3002
LEFT JOIN mCore_Account ca on ca.iMasterId = d.iBookNo
LEFT JOIN mCore_Account pa on pa.iMasterId = d.iCode
LEFT JOIN mCore_TaxCode tc on tc.iMasterId = eb.TaxCode

WHERE h.iVoucherType IN (3332)--Challan Records
and d.iMainBodyId = 0 and t.iTag3008 = 1 and  h.iDate = dbo.dateToInt('2025-08-20')

select * from cCore_MasterDef where sMasterName like '%ex%'


select * from mCore_Currency
