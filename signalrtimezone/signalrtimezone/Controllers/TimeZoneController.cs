using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using signalrtimezone.Models;
using signalrtimezone.Services;
using System.Collections.Generic;
using System.Security.Cryptography;

namespace signalrtimezone.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TimeZoneController : ControllerBase
    {
        private readonly ITimeZoneService _timeZoneService;

        public TimeZoneController(ITimeZoneService timeZoneService)
        {
            _timeZoneService = timeZoneService;
        }

        [HttpPost("updateTimeZoneForCompany")]
        public IActionResult UpdateTimeZoneForCompany([FromBody] TimeZoneModel model)
        {
            _timeZoneService.AddOrUpdateTimeZoneDocument(model);

            return Ok("Time zone updated successfully");
        }

        [HttpGet("getData")]
        public IActionResult GetData(int companyId)
        {
            _timeZoneService.SetCompanyId(companyId);
            return Ok(GetListModel());
        }

        [HttpGet("getCompanyTimeZone")]
        public IActionResult GetCompanyTimeZone(int companyId)
        {
            var data = _timeZoneService.GetTimeZoneDocument(companyId);
            return Ok(data);
        }

        private List<DataModel> GetListModel()
        {
            return new List<DataModel>
            {
                new DataModel { Date = new DateTime(2022, 2, 24, 16, 52, 0), Value = "Rusya Dışişleri Bakanı Sergey Lavrov, Moskova'nın saldırılarına ilişkin, 'Bizi adalete ve BM prensiplerine döndürecek diyaloğa daima hazırız. Uluslararası hukuka ve sorumluluğa dönüş için hala bir şans olduğunu umuyoruz' dedi." },
                new DataModel { Date = new DateTime(2022, 2, 24, 14, 55, 0), Value = "Rus istihbarat servisi Ukrayna sınır birliklerinin Rusya - Ukrayna sınırını terkettiğini iddia etti." },
                new DataModel { Date = new DateTime(2022, 2, 24, 14, 30, 0), Value = "Kremlin'den operasyona ilişkin ilk açıklama geldi. Kremlin demir perde vurgusunun yapıldığı açıklamada operasyonun hedefine ulaşana kadar devam edeceğini bildirdi." },
                new DataModel { Date = new DateTime(2022, 2, 24, 14, 5, 0), Value = "Rus haber ajansı Azak Denizi'nde iki Rus kargo gemisine Ukrayna füzesisi isabet ettiğini, ölü ve yaralıların olduğu bilgisini geçti." },
                new DataModel { Date = new DateTime(2022, 2, 24, 13, 55, 0), Value = "Odessa'daki füze saldırısında en az 18 kişi hayatını kaybetti." },
                new DataModel { Date = new DateTime(2022, 2, 24, 13, 26, 0), Value = "Ukrayna, Rusya'nın ikinci dalga füze saldırısını başlattığını açıkladı." },
                new DataModel { Date = new DateTime(2022, 2, 24, 12, 50, 0), Value = "Kiev'den saldırılarda 40 Ukraynalının öldüğü bilgisi geldi." },
                new DataModel { Date = new DateTime(2022, 2, 24, 11, 45, 0), Value = "ABD DIŞİŞLERİ BAKAN YARDIMCISI NTV'YE KONUŞTU" },
                new DataModel { Date = new DateTime(2022, 2, 24, 10, 28, 0), Value = "Saat 10.28: Fransız haber ajansı AFP Rus kara birliklerinin Ukrayna'ya girdiği bilgisini geçti." },
                new DataModel { Date = new DateTime(2022, 2, 24, 11, 20, 0), Value = "Ukrayna Savunma Bakanlığı eli silah tutan herkesin bölgesindeki savunma hatlarına gidebileceğini söyleyerek seferberlik çağrısında bulundu." },
                new DataModel { Date = new DateTime(2022, 2, 24, 10, 13, 0), Value = "Ukrayna Sınır Muhafızları, 'Rus askeri konvoyları Ukrayna sınırını geçerek Çernigiv, Harkov ve Luhansk'a girdi' açıklamasını yaptı." },
                new DataModel { Date = new DateTime(2022, 2, 24, 9, 30, 0), Value = "AB liderleri bugünkü toplantıda Rusya'ya eylemleri için yıkıcı sonuçlar getirecek ilave yaptırımları görüşecek. Rusya Başkanlık Konseyi önceki saatlerde, 'Batı'nın yaptırımları yıkıcı olmaz' demişti." },
                new DataModel { Date = new DateTime(2022, 2, 24, 9, 15, 0), Value = "Ukrayna Devlet Sınır Muhafız Servisi, Rusya'nın Belarus ve Kırım'dan Ukrayna'ya saldırı başlattığını duyurdu." },
                new DataModel { Date = new DateTime(2022, 2, 24, 9, 0, 0), Value = "Ukrayna ordusu Luhansk bölgesinde 5 Rus uçağının ve 1 helikopterin düşürüldüğünü iddia etti. Rusya iddiayı yalanladı." },
                new DataModel { Date = new DateTime(2022, 2, 24, 8, 43, 0), Value = "ABD Dışişleri Bakanı Anthony Blinken, NATO Genel Sekreteri Jens Stoltenberg ile görüştü. Blinken, 'NATO'nun 5. maddesine sıkı sıkıya bağlıyız' dedi." },
                new DataModel { Date = new DateTime(2022, 2, 24, 8, 40, 0), Value = "Donbas bölgesinin Rusya yanlısı ayrılıkçıların kontrolündeki bölümünde, Rus ordusuna ait tankların geçişi görüntülendi. Öte yandan Rus askeri araçlarının bulunduğu konvoyun Ukrayna’nın Donbas bölgesinin yer aldığı sınıra doğru ilerlediği görüldü." },
                new DataModel { Date = new DateTime(2022, 2, 24, 8, 30, 0), Value = "Rusya, hassas silahlarla çok sayıda Ukrayna askeri biriminin hedef alındığını duyurdu. Rusya Savunma Bakanlığı, hava savunma sistemleri, askeri hava limanları ve hava kuvvetlerinin 'yüksek hassasiyetli silahlarla' etkisiz hale getirildiğini açıkladı." },
                new DataModel { Date = new DateTime(2022, 2, 24, 8, 18, 0), Value = "Ukrayna Savunma Bakanlığı: Doğudaki birliklerimiz, komuta merkezleri ve havaalanlarımız yoğun topçu saldırısı altında." },
                new DataModel { Date = new DateTime(2022, 2, 24, 8, 15, 0), Value = "Rus Haber Ajansı ise Karadeniz Filosu'nun çıkartma harekatı başlattığını duyurdu." },
                new DataModel { Date = new DateTime(2022, 2, 24, 8, 0, 0), Value = "Havanın aydınlanmasının ardından Kiev’de oturanlar güvenli bölgelere gitmek üzere kenti terk etmeye başladı. Kiev’de sirenler çalmaya başladı." },
                new DataModel { Date = new DateTime(2022, 2, 24, 7, 0, 0), Value = "Rus Haber Ajansı ise Karadeniz Filosu'nun çıkartma harekatı başlattığını duyurdu. Harekatla ilgili konuşan Ukrayna Devlet Başkanı Zelenski de, 'Saldırmayacağız, kendimizi savunacağız' dedi. Rusya Savunma Bakanlığı, hava savunma sistemleri, askeri hava limanları ve hava kuvvetlerinin 'yüksek hassasiyetli silahlarla' etkisiz hale getirildiğini açıkladı." },
                new DataModel { Date = new DateTime(2022, 2, 24, 6, 0, 0), Value = "Rusya Devlet Başkanı Putin, Ukrayna'nın doğusundaki Donbas'a özel askeri operasyon başlattıklarını duyurdu." }
            };
        }
    }
}
