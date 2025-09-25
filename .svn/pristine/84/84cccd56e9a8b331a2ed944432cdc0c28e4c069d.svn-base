select * from cCore_Vouchers_0 where sName like '%tax%'
--Purchase Invoice 772, Job Costing Allocation 776, EIR Records 777, Challan Records 778, Tax Invoice 3332

select * from cCore_MasterDef where sMasterName like '%Networ%'
-- networktype 3011

select  ISNULL(t.iTag3008, 0) AS jobId ,sum(i.mGross) totalSales
from tCore_Header_0 h
join tCore_Data_0 d on d.iHeaderId = h.iHeaderId
join tCore_Indta_0 i on i.iBodyId = d.iBodyId
LEFT JOIN tCore_Data_Tags_0 t ON t.iBodyId = d.iBodyId
where h.iVoucherType = 3332 --and ISNULL(t.iTag3008, 0) in (1,4,3)
group by t.iTag3008


select  ISNULL(t.iTag3008, 0) AS jobId, sum(i.mGross) totalCost
from tCore_Header_0 h
join tCore_Data_0 d on d.iHeaderId = h.iHeaderId
join tCore_Indta_0 i on i.iBodyId = d.iBodyId
LEFT JOIN tCore_Data_Tags_0 t ON t.iBodyId = d.iBodyId
where h.iVoucherType in (772,776,777,778)
group by t.iTag3008

select sName label, iMasterId value from mCore_Account 
where iMasterId <> 0 and iStatus <> 5 and iAccountType in (6,7)
