select * from cCore_Vouchers_0 where sName like '%freight%' 
--Air Cargo Job 5634, Ancillary Job 5637, Storage & Handling Job 5639, Heavy Lift Job 5640, Freight Forwarding 5641


SELECT 
   distinct h.sVoucherNo,
    convert (nvarchar, dbo.IntToDate(h.iDate),103) AS docDate,
    --ISNULL(eb.ContainerNo, '') AS ContainerNo,
    --ISNULL(eh.HblNoHeader, '') AS HBLNo,
    --ISNULL(eb.BayanNo, '') AS BayanNo,
    ISNULL(t.iTag3008, 0) AS jobId,
    ISNULL(j.sName, '') AS jobName,
    ISNULL(j.sCode, '') AS jobCode,
    ISNULL(eh.ShippingConsignmentCode, '') AS ShippingConsignmentCode,
    ISNULL(eh.PORef, '') AS PORef,
    ISNULL(sl.sName, '') AS shippingLine,
    ISNULL(js.sName, '') AS jobStatus,
    ISNULL(convert (nvarchar, dbo.IntToDate(eh.ShippedonBoard_ETDDate_),103),'') AS Arrival,
	ISNULL(pl.sName, '') AS portLoading,
    ISNULL(pd.sName, '') AS portDestination,
    ISNULL(eh.MblNoHeader, '') AS MblNoHeader,
    ISNULL(eh.HblNoHeader, '') AS HblNoHeader,
    ISNULL(hb.sName, '') AS handleBy,
    ISNULL(eh.FreightTerms, '') AS FreightTerms,
    ISNULL(br.sName, '') AS branch,
    ISNULL(s.sName, '') AS salesman,
    ISNULL(ot.sName, '') AS operationType,
    ISNULL(ca.sName, '') AS customerAcc,
    ISNULL(nt.sName, '') AS networkType,
	ISNULL(eh.TotalImportCntr20F, '') AS TotalImportCntr20F,
	ISNULL(eh.TotalImportCntr40F, '') AS TotalImportCntr40F,
  ISNULL(eh.Notes, '') AS notes,
   h.iHeaderId,
    ISNULL(v.sName, '') AS vessel
FROM tCore_Header_0 h
JOIN tCore_HeaderData5641_0 eh ON eh.iHeaderId = h.iHeaderId
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
LEFT JOIN tCore_Data5641_0 eb ON eb.iBodyId = d.iBodyId
LEFT JOIN tCore_Data_Tags_0 t ON t.iBodyId = d.iBodyId
LEFT JOIN mCore_joborder j ON j.iMasterId = t.iTag3008
LEFT JOIN mCore_port pl ON pl.iMasterId = eh.PortofLoading
LEFT JOIN mCore_port pd ON pd.iMasterId = eh.PortofDestination
LEFT JOIN mCore_shippingline sl ON sl.iMasterId = t.iTag3007
LEFT JOIN mCore_jobstatus js ON js.iMasterId = t.iTag3009
LEFT JOIN mCore_handleby hb ON hb.iMasterId = t.iTag3038
LEFT JOIN mCore_branch br ON br.iMasterId = t.iTag3002
LEFT JOIN mCore_salesman s ON s.iMasterId = t.iTag3010
LEFT JOIN mCore_operationtype ot ON ot.iMasterId = t.iTag3014
LEFT JOIN mCore_networktype nt ON nt.iMasterId = t.iTag3011
LEFT JOIN mCore_vessel v ON v.iMasterId = t.iTag3037
LEFT JOIN mCore_Account ca on ca.iMasterId = d.iBookNo
WHERE h.iVoucherType IN (5641)--Freight Forwarding


select * from cCore_MasterDef where sMasterName like '%vess%' --vessel 3037

drop table EX_JobRegLockedCost