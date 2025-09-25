--select * from cCore_Vouchers_0 where sName like '%job c%' --Job Costing Allocation 776

SELECT 
   distinct h.sVoucherNo,
    convert (nvarchar, dbo.IntToDate(h.iDate),103) AS docDate,
    ISNULL(eb.VendorInvNo, '') AS vendorInvNo,
	h.iHeaderId
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 ind on ind.iBodyId = d.iBodyId
LEFT JOIN tCore_Data776_0 eb ON eb.iBodyId = d.iBodyId
WHERE h.iVoucherType IN (776)--Air Cargo Job 
and d.iMainBodyId = 0 --and ISNULL(eb.VendorInvNo, '') in ()