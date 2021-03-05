/* Author by Phan Chau Nam
   Created by Feb 2021
*/
$(function() {
    var e = function(e) {
        for (var t = "", n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", s = n.length, i = 0; i < e; i++) t += n.charAt(Math.floor(Math.random() * s));
        return t
    }(10);

    function t(e) {
        console.log(e);
        var t = $("#" + e.fileDir);
        t.find(".answer").val(e.fileURL).trigger("change"), t.find(".q-answer .btnUpload").toggleClass("upload-done", !0).text("Đổi hình"), hideInfo(), hideError(), showInfo(t, "Upload thành công!")
    }

    function n(e) {
        var t = $("#" + e.fileDir).closest(".ds-question");
        t.find(".q-answer .btnUpload").text("Upload lại"), hideInfo(), hideError(), showError(t, "Upload thất bại!")
    }
    $("#respId").val(e), $(".dsSingle .q-answer li").on("click", function() {
        $(this).closest(".ds-question").find(".q-true-answer .answer").val($(this).closest("ul").find("input[type=radio]:checked").closest("li").find(".answerLabel").text()).trigger("change");
    }), $(".dsMultiple .q-answer li").on("click", function() {
        var e = "";
        $(this).closest(".ds-question").find("input[type=checkbox]:checked").each(function() {
            e = e + $(this).closest("li").find(".answerLabel").text() + "#"
        }), $(this).closest(".ds-question").find(".q-true-answer .answer").val(e).trigger("change");
    }), $(".btnUpload").on("click", function() {
        hideInfo(), hideError(),
            function(e) {
                const s = e[0].files[0];
                var i = $("#respId").val();
                if (null != s) {
                    e.closest(".ds-question").find(".q-answer .btnUpload").text("Đang upload...");
                    var o = e.closest(".ds-question").attr("id"),
                        r = setInterval(function() {
                            var t = e.closest(".ds-question").find(".q-answer .btnUpload"),
                                n = /^\d+$/.test(t.text().substr(0, t.text().length - 1)) ? parseInt(t.text().substr(0, t.text().length - 1), 10) : 0;
                            n < 99 && "Đổi hình" != t.text() && "Upload lại" != t.text() ? (n += 1, t.text(n + "%")) : clearInterval(r)
                        }, 100);
                    const l = new FileReader;
                    l.onload = function(e) {
                        const r = {
                            filename: i + "_" + o + ".jpg",
                            mimeType: s.type,
                            bytes: [...new Int8Array(e.target.result)],
                            fileDir: o,
                            folderName: i
                        };
                        google.script.run.withSuccessHandler(t).withFailureHandler(n).uploadFiles(r)
                    }, l.readAsArrayBuffer(s)
                } else showError(e.closest(".ds-question"), "Chưa có hình")
            }($(this).closest(".q-answer").find("input[type=file]"))
    }), $(".dsDropDown .q-answer select").on("change", function() {
        var e = $(this).find("option:selected").val();
        $(this).closest(".ds-question").find(".q-true-answer .answer").val(e).trigger("change");
    }), $(".dsPrev").on("click", function() {
        var e = $("#routing"),
            t = e.val().split(","),
            n = t.pop();
        e.val(t.join(",")), $("#currentPage").val(parseInt(n, 10)), showQuestion()
    })
});
