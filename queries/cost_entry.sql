--select * from cCore_Vouchers_0 where sName like '%chall%'
--Job Costing Allocation 776, EIR Records 777, Challan Records 778


 SELECT 
   distinct h.sVoucherNo,
    convert (nvarchar, dbo.IntToDate(h.iDate),103) AS docDate,
    ISNULL(t.iTag3008, 0) AS jobId,
    ISNULL(j.sName, '') AS jobName,
    ISNULL(j.sCode, '') AS jobCode,
    ISNULL(eb.VendorInvNo, '') AS vendorInvNo,
	ISNULL(convert (nvarchar, dbo.IntToDate(eb.VendorInvDate),103), '') AS vendorInvDate,
    ISNULL(br.sName, '') AS branch,
	case when tc.sCode = 'ZR' then ind.mRate else 0 end zeroTaxCost,
	case when tc.sCode = 'SR-REC' then ind.mRate else 0 end taxCost,
    ISNULL(ca.sName, '') AS vendorAcc,
	 ISNULL(pa.sName, '') AS purchaseAcc,
	ISNULL(bsd.[VAT Amount], '') AS taxAmount,
	ISNULL(h.fNet,0) AS totalCost,
	'' AS eirId,
	'' AS challan,
	'' AS containerNo,
	ISNULL(eb.sRemarks, '') AS sRemarks,
	d.iBodyId
FROM tCore_Header_0 h
JOIN tCore_HeaderData776_0 eh ON eh.iHeaderId = h.iHeaderId
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 ind on ind.iBodyId = d.iBodyId
LEFT JOIN tCore_Data776_0 eb ON eb.iBodyId = d.iBodyId
JOIN vCore_BodyScreenData_0 bsd on bsd.iBodyId = d.iBodyId
LEFT JOIN tCore_Data_Tags_0 t ON t.iBodyId = d.iBodyId
LEFT JOIN mCore_joborder j ON j.iMasterId = t.iTag3008
LEFT JOIN mCore_branch br ON br.iMasterId = t.iTag3002
LEFT JOIN mCore_Account ca on ca.iMasterId = d.iBookNo
LEFT JOIN mCore_Account pa on pa.iMasterId = d.iCode
LEFT JOIN mCore_TaxCode tc on tc.iMasterId = eb.TaxCode

WHERE h.iVoucherType IN (776)--Air Cargo Job 
and d.iMainBodyId = 0 and t.iTag3008 = 6 and  h.iDate = dbo.dateToInt('2025-08-20')

--select * from cCore_MasterDef where sMasterName like '%tax%'

--UPDATE t
--SET t.iTag3008 = 7
--FROM tCore_Data_Tags_0 t
--JOIN tCore_Data_0 d ON t.iBodyId = d.iBodyId
--WHERE d.iBodyId = 722;

